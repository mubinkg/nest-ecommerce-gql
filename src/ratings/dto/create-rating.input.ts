import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ImageInput } from './rating-images';
import { Status } from '../data/enum';
registerEnumType(Status,{
  name:"Status"
})
@InputType()
export class CreateRatingInput {
  @Field(()=>String, {nullable:true})
  product_id: string

  @Field(()=>String, {nullable:true})
  user_id?: string

  @Field(()=>Number, {nullable:true})
  rating?: number

  @Field(()=>String, {nullable:true})
  comment?: string

  @Field(() => [ImageInput], {nullable:true})
  images?: ImageInput[] ;

  @Field(() => [String], {nullable:true})
  imageUrl?: string[] ;
}
