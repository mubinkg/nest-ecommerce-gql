import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class GetPromoCodesInput{
    @Field(()=>Number)
    @IsNotEmpty()
    @IsNumber()
    limit:number

    @Field(()=>Number)
    @IsNotEmpty()
    @IsNumber()
    offset:number

    @Field(()=>String, {defaultValue: 'id'})
    @IsString()
    @IsOptional()
    sort?: string

    @Field(()=>String, {defaultValue: 'id'})
    @IsString()
    search?: string

    @Field(()=>String, {defaultValue: 'DESC'})
    @IsString()
    order?: string
}