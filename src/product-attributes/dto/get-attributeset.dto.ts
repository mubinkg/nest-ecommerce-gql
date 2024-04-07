import { Field, ObjectType } from "@nestjs/graphql";
import { ProductAttributeSet } from "../entities/product-attribute-set.entity";

@ObjectType()
export class GetProductAttributeSet{
    @Field(()=>[ProductAttributeSet], {nullable:true})
    productAttributeSetList?:ProductAttributeSet[]

    @Field(()=>Number, {nullable:true})
    count?: number
}