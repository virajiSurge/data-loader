import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Student, StudentSchema } from '../students/student.entity';

@Schema()
@ObjectType()
@InputType('FriendInput')
export class Friend {

  @Prop({
    required: false,
    default: 0,
    type: Number,
  })
  @Field(() => Int, { nullable: true })
  id: number;

  @Prop({
    required: false,
    type: String,
  })
  @Field(() => String, { nullable: true })
  name: string;


  // @Prop({
  //   required: false,
  //   default: 0,
  //   type: Number,
  // })
  // @Field(() => Int, { nullable: true })
  // studentId: number;

  @Prop({
    required: false,
    type: String,
  })
  @Field(() => String, { nullable: true })
  studentId: string;
}
export const FriendSchema = SchemaFactory.createForClass(Friend);
