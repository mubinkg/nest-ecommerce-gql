import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class AdminProductListDto{
    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    seller?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    category?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    status?:string

    @Field(()=>Number)
    @IsNumber()
    @IsNotEmpty()
    limit: number

    @Field(()=>Number)
    @IsNumber()
    @IsNotEmpty()
    offset: number
}