import { Field } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class DeliveryCharge{
    @Field(()=>String, {nullable:true})
    _id:string

    @Field(()=>String, {nullable:true})
    @Prop({type:String})
    countryName?:string

    @Field(()=>Number, {nullable:true})
    @Prop({type:Number})
    weight?:number

    @Field(()=>Number,{nullable:true})
    @Prop({type:Number})
    price?:number
}

export type DeliveryChargeDocument = HydratedDocument<DeliveryCharge>
export const DeliveryChargeSchema = SchemaFactory.createForClass(DeliveryCharge)