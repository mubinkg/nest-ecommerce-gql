import { Field, ObjectType } from "@nestjs/graphql";
import { Seller } from "../entities/seller.entity";

@ObjectType()
export class SellerList{
    @Field(()=>[Seller], {nullable:true})
    sellers?: Seller[]

    @Field(()=>Number, {nullable:true})
    total?: number
}