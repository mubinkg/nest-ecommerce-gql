import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FlashSell {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
