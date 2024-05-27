import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class AdminFeaturedSectionProductFilterInput{
    @Field(()=>Number)
    @IsNotEmpty()
    @IsNumber()
    limit: number

    @Field(()=>Number)
    @IsNotEmpty()
    @IsNumber()
    offset: number

    @Field(()=>[String], {nullable:true})
    @IsOptional()
    @IsArray()
    categories?: string[]

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    productType?: string
}