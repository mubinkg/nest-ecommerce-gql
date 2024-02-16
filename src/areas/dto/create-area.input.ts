import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAreaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
