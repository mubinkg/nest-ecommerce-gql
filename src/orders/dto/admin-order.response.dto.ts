import { Field, ObjectType } from "@nestjs/graphql";
import { Order } from "../entities/order.entity";

@ObjectType()
export class AdminOrderResponse{
    @Field(()=>[Order], {nullable:true})
    orders?: Order[]

    @Field(()=>Number, {nullable:true})
    count?: number
}