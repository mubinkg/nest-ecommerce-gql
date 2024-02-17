import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCustomerInput } from './create-customer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  id: string;
}
