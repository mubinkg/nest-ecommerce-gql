import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class DelteCustomerInput{
    @Field(()=>String)
    @IsNotEmpty()
    @IsString()
    mobile: string

    @Field(()=>String)
    @IsNotEmpty()
    @IsString()
    password: string
}