import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
@Schema({
  timestamps: true
})
export class Faq {
  @Field(()=>Product, {nullable:true})
  @Prop({type:mongoose.Types.ObjectId, ref: 'Product'})
  product?: Product

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  question?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: mongoose.Types.ObjectId})
  userId?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  ans?: string
}
