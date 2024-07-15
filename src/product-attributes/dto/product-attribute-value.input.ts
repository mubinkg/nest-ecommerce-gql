import { Field, InputType } from "@nestjs/graphql";
import { ProductAttributeValueType } from "../enum/attribute-value-type.enum";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class ProductAttributeValueInput{
 
    id?:string

    @Field(()=>ProductAttributeValueType)
    type?:ProductAttributeValueType

    @Field(()=>String,{nullable:false})
    valueName?:string

    @Field(()=>String,{nullable:true})
    image?:string

    @Field(()=>String,{nullable:true})
    color?:string
}