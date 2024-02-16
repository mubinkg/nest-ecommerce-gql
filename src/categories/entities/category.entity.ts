import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocuemnt = HydratedDocument<Category>

@ObjectType()
@Schema()
export class Category {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category)
