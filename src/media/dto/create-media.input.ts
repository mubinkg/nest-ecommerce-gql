import { InputType, Int, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateMediaInput {
  @Field(()=>GraphQLUpload, {nullable:true})
  file:FileUpload|string

  @Field(()=>String, {nullable:true})
  name: string

  @Field(()=>String, {nullable:true})
  extension?:String

  @Field(()=>String, {nullable:true})
  subDirectory?:String

  @Field(()=>Number, {nullable:true})
  size?:Number
}
