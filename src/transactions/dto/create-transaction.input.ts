import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TransactionType } from '../enum/transaction-type.enum';
import { TransactionStatusEnum } from '../enum/transaction-status.enum';

registerEnumType(TransactionType, {
  name:"TransactionType"
})

registerEnumType(TransactionStatusEnum, {
  name:"TransactionStatusEnum"
})

@InputType()
export class CreateTransactionInput {
  
  user:string

  @IsNotEmpty()
  @IsEnum(TransactionType)
  @Field(()=>TransactionType)
  type?:TransactionType

  @IsNumber()
  @IsNotEmpty()
  @Field(()=>Number)
  amount?:number

  @IsEnum(TransactionStatusEnum)
  @IsNotEmpty()
  @Field(()=>TransactionStatusEnum)
  status?: TransactionStatusEnum

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  message?: string
}
