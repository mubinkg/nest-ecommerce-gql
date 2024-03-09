import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class GetCategoryDto{
    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    id: string

    @Field(()=>Number, {nullable:true})
    @IsNumber()
    @IsOptional()
    limit?: number

    @Field(()=>Number, {nullable:true})
    @IsNumber()
    @IsOptional()
    offset?: number

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    sort?: string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    order?:string

    @Field(()=>Boolean, {nullable:true})
    @IsOptional()
    @IsBoolean()
    has_child_or_item?: boolean
}