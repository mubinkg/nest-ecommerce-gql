import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DiscountType } from '../types/discountType.enum';
import { ActiveStatus } from '../types/activeStatus.enum';
import { RepeatUsage } from '../types/repeatUsage.enum';

export type PromoCodeDocument = HydratedDocument<PromoCode>

@ObjectType()
@Schema({timestamps:true})
export class PromoCode {
  @Field(() => String,{nullable:true})
  _id?: string;

  @Field(()=>String,{nullable:true})
  @Prop({type:String, unique:true})
  promoCode?:string

  @Field(()=>String,{nullable:true})
  @Prop({type:String})
  message?:string

  @Field(()=>String,{nullable:true})
  @Prop({type:String})
  image?:string

  @Field(()=>DiscountType,{nullable:true})
  @Prop({type:String,enum:DiscountType})
  discountType?:DiscountType

  @Field(()=>Number,{nullable:true})
  @Prop({type:Number})
  discountAmount?:number

  @Field(()=>Date,{nullable:true})
  @Prop({type:Date})
  startDate?:Date

  @Field(()=>Date,{nullable:true})
  @Prop({type:Date})
  endDate?:Date

  @Field(()=>Number,{nullable:true})
  @Prop({type:Number})
  minOrderAmount?:Number

  @Field(()=>Number,{nullable:true})
  @Prop({type:Number})
  maxOrderAmount?:Number

  @Field(()=>Number,{nullable:true})
  @Prop({type:Number})
  numberOfUsers?:number

  @Field(()=>Number,{nullable:true})
  @Prop({type:Number,default:0})
  numberOfUsedUser?:number

  @Field(()=>[String],{nullable:true})
  @Prop([{type:mongoose.Schema.Types.ObjectId}])
  usedUsers?:string

  @Field(()=>RepeatUsage,{nullable:true})
  @Prop({type:String,enum:RepeatUsage})
  repeatUsage?:RepeatUsage

  @Field(()=>Number,{nullable:true})
  @Prop({type:Number})
  numberOfRepeatUsage?:number

  @Field(()=>Boolean,{nullable:true})
  @Prop({type:Boolean})
  isCashBack?:boolean

  @Field(()=>ActiveStatus,{nullable:true})
  @Prop({type:String,enum:ActiveStatus})
  status?:ActiveStatus

  @Field(()=>Date,{nullable:true})
  createdAt?:Date
}


export const PromoCodeSchema = SchemaFactory.createForClass(PromoCode)