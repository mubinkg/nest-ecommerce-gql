import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Aramic {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
