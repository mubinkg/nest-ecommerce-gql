import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateBrandInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(()=>String, {nullable:true})
  @IsNotEmpty()
  @IsString()
  image: string
}
