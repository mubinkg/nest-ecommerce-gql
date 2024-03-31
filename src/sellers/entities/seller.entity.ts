import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SellerStatusEnum } from '../enum/seller-status.enum';

@Schema({
  timestamps: true
})
@ObjectType()
export class Seller {

  @Field(()=>String)
  _id: string

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  name?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String, unique:true})
  mobile?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String, unique:true})
  email?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  password?: string;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  address?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  address_proof?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  national_identity_card?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  business_license?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  account_number?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  account_name?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  bank_code?: String;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  bank_name?: String;

  @Field(() => Boolean, {nullable:true})
  @Prop({type: Boolean, default: false})
  isAdmin?: boolean;

  @Field(()=>String, {nullable:true})
  @Prop({type:String, enum: SellerStatusEnum, default: SellerStatusEnum.INACTIVE})
  status?: SellerStatusEnum
}

export type SellerDocument = HydratedDocument<Seller>
export const SellerSchema = SchemaFactory.createForClass(Seller)
