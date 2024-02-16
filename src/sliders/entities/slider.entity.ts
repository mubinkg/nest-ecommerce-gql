import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Slider {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
