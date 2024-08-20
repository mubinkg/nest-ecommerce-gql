import { CreateFlashSellInput } from './create-flash-sell.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFlashSellInput extends PartialType(CreateFlashSellInput) {
  @Field(() => Int)
  id: number;
}
