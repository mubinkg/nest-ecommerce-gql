import { Field, ObjectType } from "@nestjs/graphql";
import { ProductVariant } from "../entities/product-variant.entity";

@ObjectType()
export class AmdinProductVariantResponse{
    @Field(()=>Number, {nullable:true})
    count?: number

    @Field(()=>[ProductVariant])
    productVariants?: ProductVariant[]
}