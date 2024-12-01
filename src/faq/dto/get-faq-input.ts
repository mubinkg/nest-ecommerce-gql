import { Field, InputType, Int } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";

@InputType()
export class GetFaqInput{
    @Field(()=>String, {nullable:true, defaultValue: 'id'})
    @IsString()
    @IsOptional()
    sort?: string

    @Field(()=>String, {nullable:true, defaultValue: 'DESC'})
    @IsString()
    @IsOptional()
    order?: string
}