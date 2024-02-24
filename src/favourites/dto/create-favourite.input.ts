import { InputType, Int, Field } from '@nestjs/graphql';
import mongoose from 'mongoose';

@InputType()
export class CreateFavouriteInput {
  @Field(()=>String, {nullable:true})
  product_id: string

  @Field(()=>String, {nullable:true})
  user_Id: string
}
