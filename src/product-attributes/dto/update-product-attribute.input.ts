import { CreateProductAttributeInput } from './create-product-attribute.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductAttributeInput extends PartialType(CreateProductAttributeInput) {
  @Field(() => Int)
  id: number;
}
