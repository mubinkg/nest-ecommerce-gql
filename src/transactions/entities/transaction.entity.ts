import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';

@ObjectType()
@Schema({
  timestamps: true
})
export class Transaction {
  
  @Field(()=>String)
  _id: string

  @Field(()=>Customer, {nullable:true})
  @Prop({type: mongoose.Types.ObjectId, ref: "Customer"})
  user?:Customer

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  type?:string

  @Field(()=>Number,{nullable:true})
  @Prop({type:Number})
  amount?:number

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  status?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  message?: string

  @Field(()=>Date, {nullable:true})
  createdAt?: Date

  @Field(()=>Date, {nullable:true})
  updatedAt?: Date
  
}
