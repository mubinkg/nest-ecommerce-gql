import { CreateAreaInput } from './create-area.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAreaInput extends PartialType(CreateAreaInput) {
  @Field(() => Int)
  id: number;
}
