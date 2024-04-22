import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SliderType } from './slider-type.entity';

export type SliderDocument = HydratedDocument<Slider>

@ObjectType()
@Schema()
export class Slider {

  @Field(() => String)
  _id: string;

  @Field(() => SliderType, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'SliderType'})
  slider_type: SliderType;

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

export const SliderSchema = SchemaFactory.createForClass(Slider)
