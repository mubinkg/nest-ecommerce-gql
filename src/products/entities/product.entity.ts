import { ObjectType, Field,  } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose'

export type ProductDocument = HydratedDocument<Product>

@ObjectType()
@Schema()
export class Product {
  @Field(() => String, {nullable:true})
  _id: string;

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  category_id: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  tax: number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  type: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  stock_type: number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  name: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  short_description: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  indicator: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  cod_allowed: number

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  minimum_order_quantity: number

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  quantity_step_size: number

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  total_allowed_quantity: number

  @Field(()=>Boolean, {nullable:true})
  @Prop({type:Boolean})
  is_prices_inclusive_tax: boolean

  @Field(()=>Boolean, {nullable:true})
  @Prop({type:Boolean})
  is_returnable: boolean

  @Field(()=>Boolean, {nullable:true})
  @Prop({type:Boolean})
  is_cancelable: boolean

  @Field(()=>Date, {nullable:true})
  @Prop({type:Date})
  cancelable_till: Date

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  image: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  video_type: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  video: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  tags: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  warranty_period: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  made_in: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  sku: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  stock: number

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  availability: number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  description: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  deliverable_type: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  deliverable_zipcodes: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  seller_id: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  variant_id: string

}

export const ProductSchema = SchemaFactory.createForClass(Product)