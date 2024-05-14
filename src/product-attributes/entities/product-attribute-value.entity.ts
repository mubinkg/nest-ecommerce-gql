import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ProductAttributeValueType } from "../enum/attribute-value-type.enum";
import { ActiveStatus } from "src/promo-code/types/activeStatus.enum";
import { HydratedDocument } from "mongoose";


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