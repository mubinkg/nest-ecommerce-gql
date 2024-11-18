import { InputType, Int, Field } from '@nestjs/graphql';
import { OfferType } from '../enum';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateOfferInput {
  @Field(()=>String)
  @IsEnum(OfferType)
  @IsNotEmpty()
  type:OfferType

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  image:string

  @Field(()=>String)
  @IsMongoId()
  @IsNotEmpty()
  category:string

  @Field(()=>[String])
  @IsArray()
  products:string[]
}
