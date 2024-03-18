import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { SectionStyle } from '../enum/section-style.enum';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { UniqueArrayConstraint } from 'src/validators/unique-array';

registerEnumType(SectionStyle, {
  name: "SectionStyle"
})

@InputType()
export class CreateSectionInput {
  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  title:string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  description:string

  @Field(()=>[String], {nullable:true})
  @IsOptional()
  @IsArray()
  @IsString({
    each: true
  })
  @Validate(UniqueArrayConstraint)
  categories?:string[]

  @Field(()=>SectionStyle, {defaultValue: SectionStyle.DEFAULT})
  @IsEnum(SectionStyle)
  @IsNotEmpty()
  style:SectionStyle

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  productType?:string

  @Field(()=>[String], {nullable:true})
  @IsArray()
  @IsOptional()
  @IsString({
    each:true
  })
  products?:string[]
}
