import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductTaxDocument = HydratedDocument<ProductTax>

@Schema({
    timestamps: true
})
@ObjectType()
export class ProductTax{
    @Field(()=>String)
    _id: string

    @Field(()=>String, {nullable:true})
    @Prop({type:String})
    title?:string

    @Field(()=>Number, {nullable:true})
    @Prop({type: Number})
    percentage?: number
}


export const ProductTaxSchema = SchemaFactory.createForClass(ProductTax)