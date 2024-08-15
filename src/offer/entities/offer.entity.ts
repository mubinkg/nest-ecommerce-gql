import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({
  timestamps: true
})
export class Offer {
  @Field(() => String)
  _id: string

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  image?: string;

  @Field(() => String , {nullable:true})
  @Prop({type: String})
  link?: string;

  @Field(() => String , {nullable:true})
  @Prop({type: String})
  category?: string;

  @Field(() => String , {nullable:true})
  @Prop({type: String})
  product?: string;
}

export type OfferDocument = HydratedDocument<Offer>
export const OfferSchema = SchemaFactory.createForClass(Offer)
