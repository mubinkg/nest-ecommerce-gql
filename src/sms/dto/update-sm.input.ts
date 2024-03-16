import { CreateSmInput } from './create-sm.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSmInput extends PartialType(CreateSmInput) {
  @Field(() => Int)
  id: number;
}
