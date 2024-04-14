import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "../entities/product.entity";

@ObjectType()
export class AdminProductListResponseDto{
    @Field(()=>[Product], {nullable:true})
    products?: Product[]

    @Field(()=>Number, {nullable:true})
    count?: number
}