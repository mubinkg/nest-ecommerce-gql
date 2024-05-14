import { Field, ObjectType } from "@nestjs/graphql"
import { ProductAttributeValue } from "./product-attribute-value.entity"
import { ActiveStatus } from "src/promo-code/types/activeStatus.enum"

@ObjectType()
export class AdminProductAttributeValues{
    @Field(()=>String,{nullable:true})
    name?:string

    @Field(()=>ProductAttributeValue,{nullable:true})
    values?:ProductAttributeValue

    @Field(()=>ActiveStatus,{nullable:true})
    status?:ActiveStatus
}

@ObjectType()
export class AdminProductAttributeValuesResponse{
    @Field(()=>Number,{nullable:true})
    count?: number

    @Field(()=>[AdminProductAttributeValues], {nullable:true})
    values?: AdminProductAttributeValues[]
}