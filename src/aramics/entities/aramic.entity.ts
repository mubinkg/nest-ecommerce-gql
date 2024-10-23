import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
export class Deliverycharge {
  @Field(() => String)
  _id: string
  
  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  countryCode?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  countryName?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  eramicsCountryName?: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  weight?: number

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  price?: number
}

export const DeliveryChargeSchema = SchemaFactory.createForClass(Deliverycharge)
export type DeliveryChargeDocument = HydratedDocument<Deliverycharge>
