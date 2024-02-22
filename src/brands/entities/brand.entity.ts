import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>

@ObjectType()
@Schema()
export class Brand {

  @Field(()=>String)
  _id: string

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  name?: string;

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  image?:string
}


export const BrandSchema = SchemaFactory.createForClass(Brand)