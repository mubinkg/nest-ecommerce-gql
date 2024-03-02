import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateOrderInput {

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  mobile:string

  @Field(()=>[String])
  @IsArray()
  product_variant_id:string[]

  @Field(()=>[Number])
  @IsArray()
  quantity?:number[]

  @Field(()=>Number)
  @IsNotEmpty()
  @IsNumber()
  total?:number

  @Field(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  delivery_charge?:number

  @Field(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  final_total?:number

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsOptional()
  promo_code?:string

  @Field(()=>Number,{nullable:true})
  @IsString()
  @IsOptional()
  promo_discount?:number

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  payment_method?:string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  address_id?:string

  @Field(()=>Number, {defaultValue: 0})
  @IsNumber()
  @IsNotEmpty()
  is_wallet_used?:number

  @Field(()=>Number, {defaultValue: 0})
  @IsNumber()
  @IsNotEmpty()
  wallet_balance_used?:number

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsOptional()
  order_note?:string //{optional}

  @Field(()=>[String], {nullable:true})
  documents?:string[]

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsNotEmpty()
  email?:string 
}
