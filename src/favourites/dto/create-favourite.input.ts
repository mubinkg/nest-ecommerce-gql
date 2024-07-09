import { InputType, Int, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

@InputType()
export class CreateFavouriteInput {
  @Field(()=>String, {nullable:true})
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  product_id: string

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  user_Id: string
}
