import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProductResponse } from 'src/products/dto/product-responose.dto';

@ObjectType()
@Schema({timestamps:true})
export class Favourite {
  @Field(()=>String, {nullable:true})
  _id: string

  @Field(()=>ProductResponse, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
  product: ProductResponse

  @Field(()=>String, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId})
  user: string
}


export type FavouriteDocument = HydratedDocument<Favourite>
export const FavouriteSchema = SchemaFactory.createForClass(Favourite)