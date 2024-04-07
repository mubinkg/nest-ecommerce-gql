import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateProductAttributeSetInput{
    @Field(()=>String)
    @IsString()
    @IsNotEmpty()
    attributeSetName:string
}