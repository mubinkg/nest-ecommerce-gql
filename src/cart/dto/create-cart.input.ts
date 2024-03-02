import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCartInput {
  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  product_variant_id:string

  @Field(()=>Number, {defaultValue: 0})
  @IsNotEmpty()
  @IsNumber()
  is_saved_for_later: number

  @Field(()=>Number, {defaultValue: 1})
  @IsNotEmpty()
  @IsNumber()
  qty:number
}
