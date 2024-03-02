import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@ObjectType()
@Schema({timestamps:true})
export class ProductFaq {
  @Field(()=>String,{nullable:true})
  _id?:string
  
  @Field(()=>String,{nullable:true})
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:'products'})
  productId?:string

  @Field(()=>String,{nullable:true})
  @Prop({type:String})
  question?:string

  @Field(()=>String,{nullable:true})
  @Prop({type:String})
  ans?:string

  @Field(()=>Date,{nullable:true})
  createdAt?:Date
}
