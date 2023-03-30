import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Friend } from '../friends/friends.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
@Schema()
@ObjectType()
@InputType('UserInput')
export class User {
  // @Field(() => String, { nullable: true })
  // _id: MongooseSchema.Types.ObjectId;

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
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
