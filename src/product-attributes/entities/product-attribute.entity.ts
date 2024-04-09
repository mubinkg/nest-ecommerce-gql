import { Field, ObjectType } from "@nestjs/graphql";
import {raw, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ActiveStatus } from "src/promo-code/types/activeStatus.enum";
import { ProductAttributeValue } from "./product-attribute-value.entity";
import { ProductAttributeSet } from "./product-attribute-set.entity";

export type ProductAttributeDocument = HydratedDocument<ProductAttribute>


@ObjectType()
@Schema({timestamps:true})
export class ProductAttribute{
        @Field(()=>String,{nullable:true})
        _id?:string

        @Field(()=>String,{nullable:true})
        @Prop({type:String})
        name?:string

        @Field(()=>ProductAttributeSet,{nullable:true})
        @Prop({type:mongoose.Schema.Types.ObjectId, ref:'ProductAttributeSet'})
        attributeSet?:ProductAttributeSet

        @Field(()=>ProductAttributeValue,{nullable:true})
        @Prop({type:raw({ ...ProductAttributeValue})})
        values?:ProductAttributeValue

        @Field(()=>ActiveStatus,{nullable:true})
        @Prop({type:String,enum:ActiveStatus,default:ActiveStatus.ACTIVE})
        status?:ActiveStatus
}

export const ProductAttributeSchema = SchemaFactory.createForClass(ProductAttribute)
