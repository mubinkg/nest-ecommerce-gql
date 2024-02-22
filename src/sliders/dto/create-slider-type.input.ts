import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString, } from "class-validator";

@InputType()
export class CreateSliderTypeInput{
    @Field(()=>String)
    @IsNotEmpty()
    @IsString()
    type: string

    @Field(()=>Number)
    @IsNotEmpty()
    @IsNumber()
    type_id: number
}