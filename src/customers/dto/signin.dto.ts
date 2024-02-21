import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SignInDto{
    @Field(()=>String)
    @IsNotEmpty()
    @IsString()
    mobile_no: string

    @Field(()=>String)
    @IsString()
    @IsNotEmpty()
    password: string
}