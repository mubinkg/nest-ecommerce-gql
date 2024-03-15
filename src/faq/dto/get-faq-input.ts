import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsSemVer, IsString } from "class-validator";

@InputType()
export class GetFaqInput{
    @Field(()=>Int)
    @IsInt()
    @IsNotEmpty()
    limit: number
    
    @Field(()=>Int)
    @IsInt()
    @IsNotEmpty()
    offset: number

    @Field(()=>String, {nullable:true, defaultValue: 'id'})
    @IsString()
    @IsOptional()
    sort?: string

    @Field(()=>String, {nullable:true, defaultValue: 'DESC'})
    @IsString()
    @IsOptional()
    order?: string
}