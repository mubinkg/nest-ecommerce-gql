import { Field, ObjectType } from "@nestjs/graphql";
import { ProductVariant } from "../entities/product-variant.entity";
import { Product } from "src/products/entities/product.entity";

@ObjectType()
class Stock{
    @Field(()=>[ProductVariant], {nullable:true})
    values?: ProductVariant[]

    @Field(()=>Product, {nullable:true})
    product?:Product

    @Field(()=>String, {nullable:true})
    stockType?:string

    @Field(()=>String, {nullable:true})
    productType?:string
}

@ObjectType()
export class AdminStockDto{
    @Field(()=>[Stock], {nullable:true})
    stock?:Stock[]

    @Field(()=>Number, {nullable:true})
    count?: number
}
