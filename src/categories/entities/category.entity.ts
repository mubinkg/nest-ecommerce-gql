import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CategoryStatus } from '../enum/category-status.enum';

export type CategoryDocuemnt = HydratedDocument<Category>

@ObjectType()
@Schema()
export class Category {

  @Field(()=>String)
  _id: string

  @Field(() => String, { nullable: true})
  @Prop({type: String})
  name?: string;

  @Field(() => Number, { nullable: true})
  @Prop({type: Number})
  order?: number;

  @Field(() => String, { nullable: true})
  @Prop({type: String})
  image?: string;

  @Field(() => String, { nullable: true})
  @Prop({type: String})
  banner?: string;

  @Field(()=>String)
  @Prop({type: String})
  parent?: string

  @Field(() => String, { nullable: true})
  @Prop({type: String, default: CategoryStatus.ACTIVE})
  status?: CategoryStatus;
}

export const CategorySchema = SchemaFactory.createForClass(Category)
