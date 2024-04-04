import { IsNotEmpty, IsString } from 'class-validator';
import { CreateSellerInput } from './create-seller.input';
import { InputType, Field, Int, PartialType, registerEnumType } from '@nestjs/graphql';
import { SellerStatusEnum } from '../enum/seller-status.enum';

registerEnumType(SellerStatusEnum, {
  name: 'SellerStatusEnum'
})
@InputType()
export class UpdateSellerInput extends PartialType(CreateSellerInput) {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  id?: string;

  @Field(()=>SellerStatusEnum, {nullable:true})
  status?: string
}
