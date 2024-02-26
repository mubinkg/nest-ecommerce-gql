import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProductAttributeSetInput{
    @Field(()=>String)
    attributeSetName:string
}