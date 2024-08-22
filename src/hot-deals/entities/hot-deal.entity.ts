import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { HotDealsEnum } from '../enum/hot-deal.enum';

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

  @Field(()=>Number, {nullable:true})
  @Prop({type: Number})
  discountPercent?:number

  @Field(()=>String, {nullable:true})
  @Prop({type:String, default:HotDealsEnum.ACTIVE})
  status?: HotDealsEnum

  @Field(()=>Date, {nullable:true})
  createdAt?:Date
}

export type HotDealDocuement = HydratedDocument<HotDeal>
export const HotDealSchema = SchemaFactory.createForClass(HotDeal)