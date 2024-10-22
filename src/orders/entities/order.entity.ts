import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { Address } from 'src/addresses/entities/address.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';
import { OrderStatus } from '../enum';

export type OrderDocument = HydratedDocument<Order>

registerEnumType(OrderStatus, {
  name: "OrderStatus"
})

@ObjectType()
@Schema({
  timestamps: true
})
export class Order {

  @Field(()=>String)
  _id:string

  @Field(()=>String, {nullable:true})
  orderId?:string
  
  @Field(()=>Customer, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Customer'})
  user?:Customer

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  mobile?:string

  @Field(()=>[ProductVariant], {nullable:true})
  @Prop([{type:mongoose.Schema.Types.ObjectId, ref:"ProductVariant"}])
  product_variants?:ProductVariant[]

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

  @Field(()=>Address, {nullable:true})
  @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Address"})
  address?:Address

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

  @Field(()=>OrderStatus, {nullable:true})
  @Prop({type:String, default:OrderStatus.RECEIVED})
  status?: OrderStatus

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  email?:string // only enter when ordered product is digital product and one of them is not downloadable(download_allowed = 0)

  @Field(()=>Date, {nullable:true, name: 'created_at'})
  createdAt?:Date
}

export const OrderSchema = SchemaFactory.createForClass(Order)