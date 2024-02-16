import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAddressInput } from './create-address.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  id: string;
}
