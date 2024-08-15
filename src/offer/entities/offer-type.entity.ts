import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema({
    timestamps: true
})
export class OfferType{
    @Field(()=>String)
    _id: string

    @Field(()=>String,{nullable:true})
    @Prop({type: String})
    type?: string

    @Field(()=>Number,{nullable:true})
    @Prop({type: Number})
    type_id?: number
}

export const OfferTypeSchema = SchemaFactory.createForClass(OfferType)