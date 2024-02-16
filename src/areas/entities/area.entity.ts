import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Area {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
