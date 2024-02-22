import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateCategoryInput {
  
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => GraphQLUpload, {nullable:true})
  image?: FileUpload | string;

  @Field(() => GraphQLUpload, {nullable:true})
  banner?: FileUpload | string;

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  parent?: string
}
