import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>

@ObjectType()
@Schema()
export class Cart {

  @Field(()=>String)
  _id: string

  @Field(()=>String, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId})
  user_id:string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  product_variant_id:string

  @Field(()=>Number)
  @Prop({type: Number, default: 0})
  is_saved_for_later: number

  @Field(()=>Number)
  @Prop({type: Number})
  qty:number
}

export const CartSchema = SchemaFactory.createForClass(Cart)