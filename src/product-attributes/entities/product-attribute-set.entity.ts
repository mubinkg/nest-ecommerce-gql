import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ActiveStatus } from "src/promo-code/types/activeStatus.enum";

export type ProductAttributeSetDocument = HydratedDocument<ProductAttributeSet>


@ObjectType()
@Schema({timestamps:true})
export class ProductAttributeSet{
        @Field(()=>String,{nullable:true})
        _id?:string

        @Field(()=>String,{nullable:true})
        @Prop({type:String})
        attributeSetName?:string

        @Field(()=>ActiveStatus,{nullable:true})
        @Prop({type:String,enum:ActiveStatus,default:ActiveStatus.ACTIVE})
        status?:ActiveStatus
}

export const ProductAttributeSetSchema = SchemaFactory.createForClass(ProductAttributeSet)


