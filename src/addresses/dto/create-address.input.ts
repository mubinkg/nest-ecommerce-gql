import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsTaxId } from 'class-validator';
import { AddressType } from '../enum/address.enum';

@InputType()
export class CreateAddressInput {

  @Field(()=>String)
  @IsNotEmpty()
  @IsString()
  user_id?:string

  @Field(()=>String, {nullable: true})
  @IsOptional()
  @IsEnum(AddressType)
  type?:AddressType

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  name?:String

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  country_code?: string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  alternate_mobile?:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  address?:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  landmark?: string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  area_id?:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  city_id:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  city_name?:String

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  area_name?:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  pincode_name?:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  pincode?:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  state?:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  country?:string

  @Field(()=>Int, {nullable:true})
  @IsOptional()
  @IsString()
  is_default?:number
}
