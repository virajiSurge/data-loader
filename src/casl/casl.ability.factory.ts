import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostSchema } from '../domains/posts/posts.entity';
import { Student } from '../domains/students/student.entity';
import { User } from '../domains/user/user.entity';

type Subjects = InferSubjects<typeof Post | typeof Student> | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
@Injectable()
export class CaslAbilityFactory {
  // constructor(
  //   @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  // ) {}
  createForUser(user: User) {
    console.log('first');
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    if (user.role === 'student') {
      console.log('three');
      can(Action.Manage, Post);
      can(Action.Create, Post);
    } else {
      can(Action.Read, Post);
      can(Action.Delete, Post);
      cannot(Action.Update, Post);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
