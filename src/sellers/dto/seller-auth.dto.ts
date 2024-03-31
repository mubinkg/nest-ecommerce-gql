import { Field, ObjectType } from "@nestjs/graphql";
import { Seller } from "../entities/seller.entity";

@ObjectType()
export class SellerAuthResponse{
    @Field(()=>Seller, {nullable:true})
    seller?:Seller

    @Field(()=>String, {nullable:true})
    access_token?: string
}