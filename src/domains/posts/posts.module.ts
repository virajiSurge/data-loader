import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { Post, PostSchema } from './posts.entity';
import { PostResolver } from './posts.resolver';
import { PostService } from './posts.service';

@Module({
  providers: [PostService, PostResolver],
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    CaslModule
  ],
  exports: [PostService, ],
})
export class PostModule {}
