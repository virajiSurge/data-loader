import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Friend } from '../friends/friends.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
@Schema()
@ObjectType()
@InputType('StudentInput')
export class Student {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

//   @Field()
//   id: number;

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


  @Prop({
    required: false,
    type: String,
  })
  @Field(() => String, { nullable: true })
  class: string;
  

  @Field(() => [Friend])
  friends?: Friend[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
