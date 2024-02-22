import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateBrandInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(()=>GraphQLUpload, {nullable:true})
  @IsNotEmpty()
  image: FileUpload | string
}
