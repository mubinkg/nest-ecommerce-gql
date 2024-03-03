import { InputType, Int, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

@InputType()
export class CreateProductFaqInput {
  @Field(() => String)
  @IsMongoId()
  productId: mongoose.Types.ObjectId;

  @Field(()=>String)
  question:string

  @Field(()=>String)
  ans:string

}
