import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { AddressType } from '../enum/address.enum';

@ObjectType()
@Schema()
export class Address {

  @Field(()=>String)
  @Prop({type: String})
  user_id?:string

  @Field(()=>String)
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

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  area_id?:string

  @Field(()=>String, {nullable:true})
  @Prop(()=>String)
  city_id:string

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
