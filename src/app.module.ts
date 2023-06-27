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
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
