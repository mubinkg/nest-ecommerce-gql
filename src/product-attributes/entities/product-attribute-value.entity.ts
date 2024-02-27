import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { ProductAttributeValueType } from "../enum/attribute-value-type.enum";
import mongoose from "mongoose";

@ObjectType()
@Schema({_id:false})
export class ProductAttributeValue{
    @Field(()=>String,{nullable:true})
    @Prop({type:String})
    id?:string

    @Field(()=>ProductAttributeValueType,{nullable:true})
    @Prop({type:ProductAttributeValueType})
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
}