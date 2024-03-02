import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateProductTaxInput{

    @IsString()
    @IsNotEmpty()
    @Field(()=>String)
    title?:string

    @Field(()=>Number)
    @IsString()
    @IsNotEmpty()
    percentage:number
}