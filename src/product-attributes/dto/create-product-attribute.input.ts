import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductAttributeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
