import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, } from "class-validator";

@InputType()
export class CreateSliderTypeInput{
    @Field(()=>String)
    @IsNotEmpty()
    @IsString()
    type: string

    @Field(()=>String)
    @IsNotEmpty()
    @IsString()
    type_id: string
}