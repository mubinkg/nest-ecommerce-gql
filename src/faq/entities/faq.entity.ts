import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FaqType } from '../enum/faq-type.enum';
import { HydratedDocument } from 'mongoose';


registerEnumType(FaqType,{
  name: "FaqType"
})

@ObjectType()
@Schema({
  timestamps: true
})
export class Faq {

  @Field(()=>String)
  _id?: string

  @Field(()=>FaqType)
  @Prop({type:String, enum: FaqType})
  faqType:FaqType

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  question?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  ans?: string
}

export const FaqSchema = SchemaFactory.createForClass(Faq)
export type FaqDocument = HydratedDocument<Faq>
