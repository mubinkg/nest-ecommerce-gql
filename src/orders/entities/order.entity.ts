import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>

@ObjectType()
@Schema({
  timestamps: true
})
export class Order {

  @Field(()=>String)
  _id:string
  
  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  user_id?:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  mobile?:string

  @Field(()=>[String], {nullable:true})
  @Prop([{type:String}])
  product_variant_id?:string[]

  @Field(()=>[Number], {nullable:true})
  @Prop([{type:Number}])
  quantity?:number[]

  @Field(()=>Number,{nullable:true})
  @Prop({type: Number})
  total?:number

  @Field(()=>Number,{nullable:true})
  @Prop({type: Number})
  delivery_charge?:number

  @Field(()=>Number,{nullable:true})
  @Prop({type: Number})
  final_total?:number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  promo_code?:string

  @Field(()=>Number,{nullable:true})
  @Prop({type: Number})
  promo_discount?:number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  payment_method?:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  address_id?:string

  @Field(()=>Number, {nullable:true, defaultValue: 0})
  @Prop({type:Number})
  is_wallet_used?:number

  @Field(()=>Number, {nullable:true, defaultValue: 0})
  @Prop({type:Number})
  wallet_balance_used?:number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  order_note?:string //{optional}

  @Field(()=>[String], {nullable:true})
  @Prop([{type:String}])
  documents?:string[]

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  email?:string // only enter when ordered product is digital product and one of them is not downloadable(download_allowed = 0)

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  created_at?:string
}

export const OrderSchema = SchemaFactory.createForClass(Order)