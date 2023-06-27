import { Body, Controller, Post } from '@nestjs/common';
import { ClusterMigrationService } from './ClusterMigration.service';

export class CreateCouponDto {
  indices: string[];
}

@Controller()
export class ClusterMigrateController {
  constructor(
    private readonly clusterMigrationService: ClusterMigrationService,
  ) {}

  @Post('migrateCluster')
  async migrateCluster(@Body() indices: string[]) {
    return await this.clusterMigrationService.migrateIndexes(indices);
  }
}
