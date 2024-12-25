import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({
  timestamps:true
})
export class Notification {
  @Field(() => String)
  _id: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)
export type NotificationDocument = HydratedDocument<Notification>
