import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCartInput } from './create-cart.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCartInput{
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  cartId: string;

  @Field(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  qty: number
}
