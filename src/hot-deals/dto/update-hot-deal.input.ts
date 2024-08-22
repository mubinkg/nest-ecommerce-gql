import { CreateHotDealInput } from './create-hot-deal.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHotDealInput extends PartialType(CreateHotDealInput) {
  @Field(() => Int)
  id: number;
}
