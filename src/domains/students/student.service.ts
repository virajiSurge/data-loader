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
  
    return await this.studentsModel.find();
  }


}
