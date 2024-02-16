import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateCustomerInput {

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  name: string

  @Field(()=>String, {nullable:true})
  @IsEmail()
  @IsOptional()
  email: string
  
  @Field(()=>String, {nullable:true})
  @IsMobilePhone()
  @IsOptional()
  mobile_no: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  password: string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  street: string

  @Field(()=>String, {nullable: true})
  @IsOptional()
  @IsString()
  area: string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  city: string
}
