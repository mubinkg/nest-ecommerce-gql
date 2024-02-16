import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SliderDocument = HydratedDocument<Slider>

@ObjectType()
@Schema()
export class Slider {

  @Field(() => String)
  _id: string;

  @Field(() => String)
  @Prop({type: String})
  slider_type: string;

  @Field(() => String, {nullable:true})
  @Prop({type: String})
  image?: string;

  @Field(() => String , {nullable:true})
  @Prop({type: String})
  link?: string;
}

export const SliderSchema = SchemaFactory.createForClass(Slider)
