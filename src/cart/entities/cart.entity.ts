import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';
import { ProductVariant } from 'src/product-variants/entities/product-variant.entity';

export type CartDocument = HydratedDocument<Cart>

@ObjectType()
@Schema()
export class Cart {

  @Field(()=>String)
  _id: string

  @Field(()=>Customer, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref:"Customer"})
  user?:Customer

  @Field(()=>ProductVariant, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant"})
  product_variant:ProductVariant

  @Field(()=>Number)
  @Prop({type: Number, default: 0})
  is_saved_for_later: number

  @Field(()=>Number)
  @Prop({type: Number})
  qty:number
}

export const CartSchema = SchemaFactory.createForClass(Cart)