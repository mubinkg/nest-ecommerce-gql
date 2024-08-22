import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHotDealInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
