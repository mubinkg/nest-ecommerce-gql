import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TicketType } from './ticker-type.entity';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from 'src/customers/entities/customer.entity';
import { TicketCustomer } from '../dto/ticket-customer.dto';

@ObjectType()
@Schema({
  timestamps:{
    createdAt: true
  }
})
export class Ticket {

  @Field(()=>String)
  _id: string

  @Field(() => TicketType, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "TicketType"})
  ticket_type?: TicketType;

  @Field(() => TicketCustomer, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Customer"})
  user?: TicketCustomer;

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  subject?:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  email?:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  description?:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  status?:string 

  @Field(()=>Date, {nullable:true})
  created_at?: Date
}

export type TicketDocument = HydratedDocument<Ticket>
export const TicketSchema = SchemaFactory.createForClass(Ticket)