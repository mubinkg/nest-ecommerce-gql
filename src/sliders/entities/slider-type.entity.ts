import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type SliderTypeDocument = HydratedDocument<SliderType>

@Schema()
@ObjectType()
export class SliderType{

    @Field(()=>String)
    _id: string

    @Field(()=>String,{nullable:true})
    @Prop({type: String})
    type?: string

    @Field(()=>String,{nullable:true})
    @Prop({type: String})
    type_id?: string
}

export const SliderTypeSchema = SchemaFactory.createForClass(SliderType)