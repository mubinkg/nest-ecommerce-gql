import { InputType, Int, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { DiscountType } from '../types/discountType.enum';
import { ActiveStatus } from '../types/activeStatus.enum';
import { RepeatUsage } from '../types/repeatUsage.enum';
import { IsOptional } from 'class-validator';

@InputType()
export class CreatePromoCodeInput {
  @Field(()=>String)
  promoCode:string

  @Field(()=>String)
  message:string

  @Field(()=>GraphQLUpload)
  image?:FileUpload | string

  @Field(()=>DiscountType)
  discountType:DiscountType

  @Field(()=>Number)
  discountAmount:number

  @Field(()=>Date)
  startDate?:Date

  @Field(()=>Date)
  endDate?:Date

  @Field(()=>Number)
  minOrderAmount?:Number

  @Field(()=>Number)
  maxOrderAmount?:Number

  @Field(()=>Number)
  numberOfUsers?:number

  @Field(()=>RepeatUsage)
  repeatUsage?:RepeatUsage

  @Field(()=>Number,{defaultValue:0})
  @IsOptional()
  numberOfRepeatUsage?:number

  @Field(()=>Boolean,{defaultValue:false})
  isCashBack?:boolean

  @Field(()=>ActiveStatus)
  status:ActiveStatus
}
