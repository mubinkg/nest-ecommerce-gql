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
  username?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  address?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  area?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  city?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  email?: string
  
  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  mobile_no?: string

  @Prop({type: String})
  password?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  country_code?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  currency?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: Number, default: 0})
  wallet_amount?: number

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  language?: string

  @Field(()=>Date, {nullable:true})
  @Prop({type: Date})
  dob?: Date

  @Field(()=>Number, {nullable:true})
  @Prop({type: Number})
  height?: number

  @Field(()=>Number, {nullable:true})
  @Prop({type: Number})
  weight?: number

  @Field(()=>Number, {nullable:true})
  @Prop({type: Number})
  shoe_size?: number

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  favourite_k_pop_group?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  flavor?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  referral_code?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  friends_code?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  image?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String, default: Status.ACTIVE})
  status?: Status
}


export const CustomerSchema = SchemaFactory.createForClass(Customer)