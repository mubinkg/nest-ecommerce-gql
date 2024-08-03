import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';
import { Seller } from 'src/sellers/entities/seller.entity';

@ObjectType()
@Schema({
  timestamps: true
})
export class Withdrawal {
  @Field(() => String)
  _ids: string;

  @Field(()=>Seller, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Seller"})
  seller?: Seller

  @Field(()=>Customer, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Customer"})
  customer?: Customer

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  paymentDetails?: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  amountRequested?: number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  remarks?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  status?: string

  @Field(()=>Date, {nullable:true})
  createdAt?: Date
}
