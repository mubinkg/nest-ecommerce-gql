import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Sm {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
