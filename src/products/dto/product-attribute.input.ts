import { Field, InputType } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";

@InputType()
export class ProductAttributeInput{
    @Field(()=>String)
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    attribute?:any

    @Field(()=>[String])
    @IsArray()
    values?: any[]
}