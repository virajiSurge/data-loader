import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Action, AppAbility } from 'src/casl/casl.ability.factory';
import { CheckPolicies, PoliciesGuard } from 'src/casl/policyGuard';
import { Post } from './posts.entity';
import { PostService } from './posts.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Resolver(Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return await this.postService.findAll();
  }

  @Mutation(() => Post)
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Post))
  async createRating(
    @Args('name', { type: () => String, nullable: true }) name: string,
    @Args('content', { type: () => String, nullable: true }) content: string,
  ): Promise<Post> {
    return await this.postService.createPost(name, content);
  }

  @SkipThrottle(false)
  @Query(() => [Post])
  async getMyPosts(
    @Args('studentId', { type: () => Number, nullable: true })
    studentId: number,
  ): Promise<Post[]> {
    return await this.postService.findMyPosts(studentId);
  }
}
