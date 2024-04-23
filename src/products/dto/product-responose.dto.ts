import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "../entities/product.entity";
import { ProductVariant } from "src/product-variants/entities/product-variant.entity";
@ObjectType()
export class ProductResponse extends Product {
  @Field(() => [ProductVariant], { description: 'Product Variants', nullable:true })
  productvariants?: ProductVariant[]
}