import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SliderType } from './slider-type.entity';
import { SliderContentTypeEnum } from '../enum';

export type SliderDocument = HydratedDocument<Slider>

registerEnumType(SliderContentTypeEnum, {
  name: "SliderContentTypeEnum"
})

@ObjectType()
@Schema()
export class Slider {

  @Field(() => String)
  _id: string;

  @Field(() => SliderType, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'SliderType'})
  slider_type: SliderType;

  @Field(()=>SliderContentTypeEnum, {nullable:true})
  @Prop({type:String})
  type?: SliderContentTypeEnum

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
