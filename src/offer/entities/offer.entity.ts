import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Offer {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
