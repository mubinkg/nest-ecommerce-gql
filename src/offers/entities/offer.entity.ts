import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({
  timestamps:true
})
export class Offer {
  @Field(() => String)
  _id: string;

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  type:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  image:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  link:string

  @Field(()=>String, {nullable:true})
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"Category"})
  category: string

  @Field(()=>[String], {nullable:true})
  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"Product"}])
  products?: String[]

  @Field(()=>Date, {nullable:true})
  createdAt?:Date
}


export const OfferSchema = SchemaFactory.createForClass(Offer)
export type OfferType = HydratedDocument<Offer>