import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
@Schema({
  timestamps:true
})
export class HotDeal {
  @Field(() => String)
  _id: string;

  @Field(()=>Product, {nullable:true})
  @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Product"})
  product?:Product

  @Field(()=>Date, {nullable:true})
  @Prop({type: Date})
  validTime?:Date

  @Field(()=>Date, {nullable:true})
  createdAt?:Date
}
