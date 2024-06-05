import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { OrderStatus } from "../enum";
import { Order } from "./order.entity";
import { ProductVariant } from "src/product-variants/entities/product-variant.entity";

@Schema({
    timestamps: true
})
@ObjectType()
export class OrderItem{
    @Field(()=>String)
    _id: string

    @Field(()=>Number, {nullable:true})
    @Prop({type: Number})
    quantity: number

    @Field(()=>ProductVariant, {nullable:true})
    @Prop({type: raw({...ProductVariant})})
    product_variant?: ProductVariant

    @Field(()=>Order, {nullable:true})
    @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Order"})
    order?: Order

    @Field(()=>String)
    @Prop({type: String, default: OrderStatus.RECEIVED})
    status?: string
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem)
export type OrderItemDocument = HydratedDocument<OrderItem>