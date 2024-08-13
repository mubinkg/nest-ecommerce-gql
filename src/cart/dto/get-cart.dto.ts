import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Cart } from "../entities/cart.entity";
import { Product } from "src/products/entities/product.entity";
import { ProductAttributeValue } from "src/product-attributes/entities/product-attribute-value.entity";

@InputType()
export class GetCartDto{
    @Field(()=>Number, {nullable:true})
    @IsNumber()
    @IsOptional()
    only_delivery_charge?: number

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    address_id?:string

    @Field(()=>Number, {nullable:true, defaultValue: 0})
    is_saved_for_later?: number
}

@ObjectType()
export class CartResults extends Cart{
    @Field(()=>Product, {nullable:true})
    product?: Product

    @Field(()=>[ProductAttributeValue], {nullable:true})
    attribute_values?: ProductAttributeValue[]
}