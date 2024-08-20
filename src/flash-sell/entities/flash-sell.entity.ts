import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
@Schema({
  timestamps: true
})
export class FlashSell {
  @Field(()=>String)
  _id: string

  @Field(()=>Product, {nullable:true})
  @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Product"})
  product?: Product

  @Field(()=>Date, {nullable:true})
  @Prop({type:Date})
  endTime?: Date

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  status?: string
}
