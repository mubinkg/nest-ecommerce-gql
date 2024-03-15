import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAramicInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
