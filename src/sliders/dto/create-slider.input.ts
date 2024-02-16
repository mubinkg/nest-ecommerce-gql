import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSliderInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
