import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateWithdrawalInput {
  @Field(()=>String)
  @IsString()
  paymentDetails?:string

  @Field(()=>Number)
  @IsNumber()
  amountRequested?: number
}
