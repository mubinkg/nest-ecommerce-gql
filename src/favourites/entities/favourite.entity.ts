import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({timestamps:true})
export class Favourite {
  @Field(()=>String, {nullable:true})
  _id: string

  @Field(()=>String, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId})
  product_id: string

  @Field(()=>String, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId})
  user_Id: string
}


export type FavouriteDocument = HydratedDocument<Favourite>
export const FavouriteSchema = SchemaFactory.createForClass(Favourite)