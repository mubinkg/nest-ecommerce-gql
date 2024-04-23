import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { Seller } from 'src/sellers/entities/seller.entity';

@ObjectType()
@Schema({
  timestamps: true
})
export class Faq {
  @Field(()=>Product, {nullable:true})
  @Prop({type:mongoose.Schema.Types.ObjectId, ref: 'Product'})
  product?: Product

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  question?: string

  @Field(()=>Seller, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Seller'})
  user?: Seller

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  ans?: string
}
