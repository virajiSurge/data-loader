import { Ability, AbilityBuilder, createMongoAbility } from '@casl/ability';
import { AccessibleModel } from '@casl/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postsModel: AccessibleModel<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.postsModel.find();
  }

  defineAbilities = (studentId) => {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    can('read', 'Post', { studentId: studentId });

    return build();
  };

  async createPost(name: string, content: string): Promise<Post> {
    const newPost = new this.postsModel({
      name: name,
      studentId: 3,
      content: content,
    });

    newPost.save();
    return newPost;
  }

  async findMyPosts(studentId: number): Promise<Post[]> {
    const ability = this.defineAbilities(studentId);
    const posts = await this.postsModel.find({}).accessibleBy(ability);
    return posts;
  }
}
