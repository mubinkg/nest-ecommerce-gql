import { Field, ObjectType } from "@nestjs/graphql";
import { ProductAttribute } from "../entities/product-attribute.entity";

@ObjectType()
export class ProductAttributeResponseDto{
    @Field(()=>[ProductAttribute], {nullable:true})
    attributeList?: ProductAttribute[]

    @Field(()=>Number, {nullable:true})
    count?: number
}