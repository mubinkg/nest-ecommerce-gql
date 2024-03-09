import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

@InputType()
export class UpdateCustomerDto{
    
    @Field(()=>String)
    @IsString()
    @IsNotEmpty()
    user_id:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    username?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    mobile_no?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    email?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    address?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    area?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    city?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    referral_code?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    old?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    new?:string
}