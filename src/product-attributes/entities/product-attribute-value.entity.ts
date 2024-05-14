import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";
import { ProductAttributeValueType } from "../enum/attribute-value-type.enum";
import { ActiveStatus } from "src/promo-code/types/activeStatus.enum";


@ObjectType()
@Schema({
    timestamps: false
})
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

    @Field(()=>ActiveStatus,{nullable:true})
    @Prop({type:String,enum:ActiveStatus,default:ActiveStatus.ACTIVE})
    status?:ActiveStatus
}