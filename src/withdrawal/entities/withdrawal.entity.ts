import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Withdrawal {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
