import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({
  timestamps:true
})
export class Notification {
  @Field(() => String)
  _id: string;

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  title?:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  body?:string

  @Field(()=>Boolean, {nullable:true})
  @Prop({type:Boolean, default: false})
  isRead?:boolean
  
  @Field(()=>Date, {nullable:true})
  createdAt?:Date
  
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
export type NotificationDocument = HydratedDocument<Notification>
