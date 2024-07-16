import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  
  user:string

  @IsNotEmpty()
  @IsString()
  @Field(()=>String)
  type?:string

  @IsNumber()
  @IsNotEmpty()
  @Field(()=>Number)
  amount?:number

  @IsString()
  @IsNotEmpty()
  @Field(()=>String)
  status?: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  message?: string
}
