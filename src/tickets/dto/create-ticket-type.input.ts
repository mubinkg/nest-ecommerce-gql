import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CereateTicketTypeInput{
    @Field(()=>String)
    @IsNotEmpty()
    @IsString()
    title: string
}