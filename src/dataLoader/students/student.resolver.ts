import {
    Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IDataloaders } from '../dataLoader.interaface';
import { Friend } from '../friends/friends.entity';
import { Student } from './student.entity';
//import { Friend } from 'src/friend/friend.entity';
//import { Student } from './student.entity';
import { StudentService } from './student.service';

@Resolver(Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student])
  async students(): Promise<Student[]> {
    return await this.studentService.getAll();;
  }

  @ResolveField('friends', () => [Friend])
  getFriends(
    @Parent() student: Student,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    const { _id: studentId } = student;
    return loaders.friendsLoader.load(studentId);
  }
}

