import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

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
