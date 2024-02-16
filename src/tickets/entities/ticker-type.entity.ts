import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TicketTypeDocument = HydratedDocument<TicketType>

@ObjectType()
@Schema()
export class TicketType{
    @Field(()=>String)
    _id: string

    @Field(()=>String)
    @Prop({type: String})
    title: string
}

export const TicketTypeSchema = SchemaFactory.createForClass(TicketType)