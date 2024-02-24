import { CreatePromoCodeInput } from './create-promo-code.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePromoCodeInput extends PartialType(CreatePromoCodeInput) {
  @Field(() => Int)
  id: number;
}
