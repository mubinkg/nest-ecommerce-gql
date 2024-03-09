import { Field, InputType } from "@nestjs/graphql"
import { IsOptional, IsString } from "class-validator"

@InputType()
export class VerifyUser{
    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    email?:string

    @Field(()=>String)
    @IsString()
    mobile?:string
}