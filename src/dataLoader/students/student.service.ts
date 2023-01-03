import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentsModel: Model<Student>,
  ) {}
  public async getAll(): Promise<Student[]> {
    const students = await this.studentsModel.find();
  
    return await this.studentsModel.find();
  }

//   async create(studentInput: Student): Promise<Student> {
//     const newStudent = new this.studentsModel();
//     newStudent.set(studentInput);

//       const savedStudent = await newStudent.save();
//       return savedStudent;
//   }
}
