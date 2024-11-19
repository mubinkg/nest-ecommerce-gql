import { IsMongoId, IsString } from 'class-validator';
import { CreateOfferInput } from './create-offer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOfferInput extends PartialType(CreateOfferInput) {
  @Field(() => String)
  @IsString()
  @IsMongoId()
  id: string;
}
