import { InputType, Int, Field } from '@nestjs/graphql';
import { OfferType } from '../enum';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsMongoId()
  @IsNotEmpty()
  category:string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  link:string

  @Field(()=>[String], {nullable:true})
  @IsOptional()
  @IsArray()
  products:string[]
}
