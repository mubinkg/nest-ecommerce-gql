import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSmInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
