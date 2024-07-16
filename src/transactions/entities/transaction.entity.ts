import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';
import { TransactionType } from '../enum/transaction-type.enum';
import { TransactionStatusEnum } from '../enum/transaction-status.enum';


registerEnumType(TransactionType, {
  name :"TransactionType"
})
registerEnumType(TransactionStatusEnum, {
  name:"TransactionStatusEnum"
})

@ObjectType()
@Schema({
  timestamps: true
})
export class Transaction {
  
  @Field(()=>String)
  _id: string

  @Field(()=>Customer, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Customer"})
  user?:Customer

  @Field(()=>TransactionType, {nullable:true})
  @Prop({type:String})
  type?:TransactionType

  @Field(()=>Number,{nullable:true})
  @Prop({type:Number})
  amount?:number

  @Field(()=>TransactionStatusEnum, {nullable:true})
  @Prop({type: String})
  status?: TransactionStatusEnum

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  message?: string

  @Field(()=>Date, {nullable:true})
  createdAt?: Date

  @Field(()=>Date, {nullable:true})
  updatedAt?: Date
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
export type TransactionDocument = HydratedDocument<Transaction>
