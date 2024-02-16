import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AddressType } from '../enum/address.enum';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';
import { Area } from 'src/areas/entities/area.entity';
import { City } from 'src/cities/entities/city.entity';

export type AddressDocument = HydratedDocument<Address>

@ObjectType()
@Schema()
export class Address {
  
  @Field(()=> String)
  _id: string

  @Field(()=>Customer, {nullable:true})
  @Prop({type: String})
  user?:Customer

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  type?:AddressType

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  name?:String

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  country_code?: string

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  alternate_mobile?:string

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  address?:string

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  landmark?: string

  @Field(()=>Area, {nullable:true})
  @Prop({type: String})
  area?:Area

  @Field(()=>City, {nullable:true})
  @Prop({type: String})
  city:City

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  city_name?:String

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  area_name?:string

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  pincode_name?:string

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  pincode?:string

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  state?:string

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  country?:string

  @Field(()=>Int, {nullable:true})
  @Prop(()=>Int)
  is_default?:number
}


export const AddressSchema = SchemaFactory.createForClass(Address)