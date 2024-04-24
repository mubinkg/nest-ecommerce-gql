import { Field, InputType } from "@nestjs/graphql";
import { CreateFaqInput } from "./create-faq.input";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class FaqAdminInput extends CreateFaqInput{
    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    ans?:string
}