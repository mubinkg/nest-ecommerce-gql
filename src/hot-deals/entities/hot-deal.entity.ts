import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class HotDeal {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
