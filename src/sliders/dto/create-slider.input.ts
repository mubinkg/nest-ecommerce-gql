import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateSliderInput {
  @Field(() => String, {nullable:true})
  @IsOptional()
  slider_type: string;

  @Field(() => GraphQLUpload, {nullable:true})
  image?: FileUpload | string

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsOptional()
  type?:string

  @Field(() => String , {nullable:true})
  @IsOptional()
  @IsString()
  link?: string;

  @Field(() => String , {nullable:true})
  @IsOptional()
  @IsString()
  category?: string;

  @Field(() => String , {nullable:true})
  @IsOptional()
  @IsString()
  product?: string;
}
