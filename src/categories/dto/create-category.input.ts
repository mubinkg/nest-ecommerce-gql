import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  image: string;

  @Field(() => String, { nullable: true})
  banner?: string;

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  parent?: string
}
