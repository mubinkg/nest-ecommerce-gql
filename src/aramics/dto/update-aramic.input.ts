import { CreateAramicInput } from './create-aramic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAramicInput extends PartialType(CreateAramicInput) {
  @Field(() => Int)
  id: number;
}
