import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateProductVariantInput } from './create-product-variant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductVariantInput{
  @Field(() => String)
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @Field(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  quantity:number

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  type: string;
}
