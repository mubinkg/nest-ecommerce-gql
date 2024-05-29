import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class GetSectionsInput{
    @Field(()=>Number, {defaultValue: 25})
    @IsInt()
    @IsNotEmpty()
    limit: number

    @Field(()=>Number, {defaultValue: 0})
    @IsInt()
    @IsNotEmpty()
    offset: number

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    user_id?: string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    section_id?: string

    @Field(()=>[String], {nullable:true})
    @IsArray()
    @IsString({
        each: true
    })
    @IsOptional()
    attribute_value_ids?: string[]

    @Field(()=>Number, {nullable:true})
    @IsInt()
    @IsOptional()
    top_rated_product?: number

    @Field(()=>Number, {defaultValue: 10})
    @IsInt()
    @IsNotEmpty()
    p_limit: number

    @Field(()=>Number, {defaultValue: 0})
    @IsInt()
    @IsNotEmpty()
    p_offset: number

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    p_sort?: string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    p_order?: string

    @Field(()=>Number, {defaultValue: 0, nullable:true})
    @IsInt()
    @IsOptional()
    discount?: number

    @Field(()=>Number, {defaultValue: 0, nullable:true})
    @IsNumber()
    @IsOptional()
    min_price?: number

    @Field(()=>Number, {defaultValue: 0, nullable:true})
    @IsNumber()
    @IsOptional()
    max_price?: number
}