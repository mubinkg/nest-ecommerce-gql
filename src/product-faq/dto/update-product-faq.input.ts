import { CreateProductFaqInput } from './create-product-faq.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductFaqInput extends PartialType(CreateProductFaqInput) {
  @Field(() => Int)
  id: number;
}
