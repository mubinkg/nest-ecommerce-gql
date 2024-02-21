import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCustomerInput {

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  name: string

  @Field(()=>String, {nullable:true})
  @IsEmail()
  @IsOptional()
  email?: string
  
  @Field(()=>String)
  @IsMobilePhone()
  @IsNotEmpty()
  mobile_no: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  password: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  country_code: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  currency: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  language: string

  @Field(()=>Date, {nullable:true})
  @IsDate()
  @IsOptional()
  dob?: Date

  @Field(()=>Number, {nullable:true})
  @IsNumber()
  @IsOptional()
  height?: number

  @Field(()=>Number, {nullable:true})
  @IsNumber()
  @IsOptional()
  weight?: number

  @Field(()=>Number, {nullable:true})
  @IsNumber()
  @IsOptional()
  shoe_size?: number

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  favourite_k_pop_group?: string

  @Field(()=>String, {nullable: true})
  @IsOptional()
  @IsString()
  flavor?: string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  referral_code?: string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  friends_code?: string
}
