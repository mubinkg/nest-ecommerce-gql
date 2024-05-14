import { Field, ObjectType } from "@nestjs/graphql"
import { ProductAttributeValue } from "../entities/product-attribute-value.entity"

@ObjectType()
export class AdminProductAttributeValuesResponse{
    @Field(()=>Number,{nullable:true})
    count?: number

    @Field(()=>[ProductAttributeValue], {nullable:true})
    values?: ProductAttributeValue[]
}