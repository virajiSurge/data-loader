import { AccessibleModel, accessibleRecordsPlugin } from '@casl/mongoose';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
@ObjectType()
@InputType('PostInput')
export class Post {
  @Field(() => String, { nullable: true })
  _id: MongooseSchema.Types.ObjectId;

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
  studentId: string;

  @Prop({
    required: false,
    type: String,
  })
  @Field(() => String, { nullable: true })
  content: string;
}

export const PostSchema = SchemaFactory.createForClass<
  Post,
  AccessibleModel<Post>
>(Post).plugin(accessibleRecordsPlugin);
//export const PostSchema = SchemaFactory.createForClass(Post);

