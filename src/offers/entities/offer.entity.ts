import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

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
  title:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  description:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  image:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  link:string

  @Field(()=>String, {nullable:true})
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"Category"})
  category: string

  @Field(()=>[Product], {nullable:true})
  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"Product"}])
  products?: Product[]

  @Field(()=>Date, {nullable:true})
  createdAt?:Date
}


export const OfferSchema = SchemaFactory.createForClass(Offer)
export type OfferDocument = HydratedDocument<Offer>