import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ProductAttributeInput{
    @Field(()=>String)
    @IsString()
    @IsNotEmpty()
    attribute?:string

    @Field(()=>[String])
    @IsArray()
    values?: string[]
}