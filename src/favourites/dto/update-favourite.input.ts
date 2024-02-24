import { CreateFavouriteInput } from './create-favourite.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFavouriteInput extends PartialType(CreateFavouriteInput) {
  @Field(() => String)
  id: string;
}
