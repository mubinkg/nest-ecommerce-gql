import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({
  timestamps:true
})
export class Offer {
  @Field(() => String)
  _id: string;

  @Field(()=>String)
  @Prop({type:String})
  type:string

  @Field(()=>String)
  @Prop({type:String})
  image:string

  @Field(()=>String)
  @Prop({type:String})
  link:string
}


export const OfferSchema = SchemaFactory.createForClass(Offer)
export type OfferType = HydratedDocument<Offer>