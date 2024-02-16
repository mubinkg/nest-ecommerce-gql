import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../enum/status.enum';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>

@ObjectType()
@Schema()
export class Customer {
  @Field(() => String)
  _id: string;

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  name?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  email?: string
  
  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  mobile_no?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  password?: string

  @Field(()=>Number, {nullable:true})
  @Prop({type: Number, default: 0})
  balance?: number

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  street?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  area?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  city?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String, default: Status.ACTIVE})
  status?: Status
}


export const CustomerSchema = SchemaFactory.createForClass(Customer)