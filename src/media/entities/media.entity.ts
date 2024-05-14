import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({
  timestamps:true
})
export class Media {
  @Field(()=>String)
  _id: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  name: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  file?:String

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  extension?:String

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  type?:String

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  subDirectory?:String

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  size?:Number
}


export type MediaDocument = HydratedDocument<Media>
export const MediaSchema = SchemaFactory.createForClass(Media)