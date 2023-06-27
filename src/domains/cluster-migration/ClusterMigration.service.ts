import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClusterMigrationService {
  sourceClient: Client;
  targetClient: Client;

  constructor(private readonly configService: ConfigService) {
    this.sourceClient = new Client({
      node: configService.get<string>('OPENSEARCH_SOURCE_URL'),
      auth: {
        username: configService.get<string>('OPENSEARCH_SOURCE_USERNAME'),
        password: configService.get<string>('OPENSEARCH_SOURCE_PASSWORD'),
      },
    });
    this.targetClient = new Client({
      node: configService.get<string>('OPENSEARCH_TARGET_URL'),
      auth: {
        username: configService.get<string>('OPENSEARCH_TARGET_USERNAME'),
        password: configService.get<string>('OPENSEARCH_TARGET_PASSWORD'),
      },
    });
  }

  async migrateIndex(indexName: string): Promise<boolean> {
    try {
      console.log(`Starting migration: ${indexName}`);
      const body = await this.sourceClient.search({
        index: indexName,
        size: 1000,
      });

      while (body.hits.hits.length > 0) {
        const bulkRequest: any[] = [];
        body.hits.hits.forEach((hit: any) => {
          bulkRequest.push({
            index: { _index: indexName, _id: hit._id, body: hit._source },
          });
        });

        const bulkResponse = await this.targetClient.bulk({
          filter_path: 'items.*.error,index',
          refresh: true,
          body: bulkRequest,
        });

        if (bulkResponse.errors) {
          bulkResponse.items.forEach((item: any) => {
            if (item.index && item.index.error) {
              const indexId = item.index._id;
              const error = item.index.error;
              console.error(`Error indexing document ${indexId}: ${error}`);
            }
          });
        }
      }

      console.log(`Migration of index '${indexName}' completed.`);
      return true;
    } catch (error) {
      console.error(`Migration of index '${indexName}' failed:`, error);
      return false;
    }
  }

  async migrateIndexes(
    indexes: string[],
  ): Promise<{ [indexName: string]: boolean }> {
    const results: { [indexName: string]: boolean } = {};

    for (const indexName of indexes) {
      const migrationResult = await this.migrateIndex(indexName);
      results[indexName] = migrationResult;
    }

    return results;
  }
}
