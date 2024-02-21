import { InputType, Int, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreateSliderInput {
  @Field(() => String, {nullable:true})
  slider_type: string;

  @Field(() => GraphQLUpload, {nullable:true})
  image?: FileUpload | string

  @Field(() => String , {nullable:true})
  link?: string;
}
