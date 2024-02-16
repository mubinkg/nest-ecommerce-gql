import { CreateCoustomerInput } from './create-coustomer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCoustomerInput extends PartialType(CreateCoustomerInput) {
  @Field(() => Int)
  id: number;
}
