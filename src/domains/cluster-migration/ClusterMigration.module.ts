import { Module } from '@nestjs/common';
import { ClusterMigrationService } from './ClusterMigration.service';
import { ClusterMigrateController } from './ClusterMigration.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ClusterMigrateController],
  providers: [ClusterMigrationService],
  imports: [ConfigModule],
  exports: [ClusterMigrationService],
})
export class ClusterMigrationModule {}
