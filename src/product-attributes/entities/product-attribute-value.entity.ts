import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductAttributeValueType } from "../enum/attribute-value-type.enum";
import { ActiveStatus } from "src/promo-code/types/activeStatus.enum";
import mongoose, { HydratedDocument } from "mongoose";
import { ProductAttribute } from "./product-attribute.entity";


@ObjectType()
@Schema({
    timestamps: true
})
export class ProductAttributeValue{
    
    @Field(()=>String,{nullable:true})
    _id?:string

    @Field(()=>ProductAttributeValueType,{nullable:true})
    @Prop({type:String, default: ProductAttributeValueType.DEFAULT})
    type?:ProductAttributeValueType

    @Field(()=>ProductAttribute, {nullable:true})
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ProductAttribute'})
    productAttribute?: ProductAttribute

    @Field(()=>String,{nullable:true})
    @Prop({type:String})
    valueName?:string

    @Field(()=>String,{nullable:true})
    @Prop({type:String})
    image?:string

    @Field(()=>String,{nullable:true})
    @Prop({type:String})
    color?:string

    @Field(()=>ActiveStatus,{nullable:true})
    @Prop({type:String,enum:ActiveStatus,default:ActiveStatus.ACTIVE})
    status?:ActiveStatus
}

export type ProductAttributeValueDocument = HydratedDocument<ProductAttributeValue>
export const ProductAttributeValueSchema = SchemaFactory.createForClass(ProductAttributeValue)