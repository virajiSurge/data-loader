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
    const students = await this.studentService.getAll();
    console.log("first",students[0].name )
    return students;
  }

  @ResolveField('friends', () => [Friend])
  getFriends(
    @Parent() student: Student,
    @Context() { loaders }: { loaders: IDataloaders },
  ) {
    const { id: studentId } = student;
    return loaders.friendsLoader.load(studentId);
  }
}

// @Resolver(() => Student)
// export class ClassesResolver {
//     constructor(private readonly studentService: StudentService) {}

//   //@Public(false)
//   @Mutation(() => Student)
//   async createClass(@Args('student') studentInput: Class): Promise<Student> {
//     return await this.studentService.create(studentInput);
//   }


// }
