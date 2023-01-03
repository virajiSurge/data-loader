import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendModule } from '../friends/friends.module';
import { Student, StudentSchema } from './student.entity';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    FriendModule,
  ],
  providers: [StudentService, StudentResolver],
})
export class StudentModule {}
