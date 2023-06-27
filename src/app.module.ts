import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { DataloaderModule } from './dataLoader/dataLoader.module';
import { DataloaderService } from './dataLoader/dataloader.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { StudentModule } from './domains/students/student.module';
import { FriendModule } from './domains/friends/friends.module';
import { PostModule } from './domains/posts/posts.module';
import { UserModule } from './domains/user/user.module';
import { CaslModule } from './casl/casl.module';
import { ClusterMigrationModule } from './domains/cluster-migration/ClusterMigration.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],

      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: true,
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    StudentModule,
    FriendModule,
    PostModule,
    UserModule,
    CaslModule,
    ClusterMigrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
