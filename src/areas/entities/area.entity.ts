import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AreaDocument = HydratedDocument<Area>

@ObjectType()
@Schema()
export class Area {

  @Field(()=>String)
  _id: string

  @Field(() => String, { nullable: true})
  @Prop({type: String})
  area_name?: String;

  @Field(() => String, { nullable: true})
  @Prop({type: String})
  city_id?: String;

  @Field(() => String, { nullable: true})
  @Prop({type: String})
  zipcode_id?: String;

  @Field(() => Number, { nullable: true})
  @Prop({type: Number})
  minimum_free_delivery_order_amount?: Number;

  @Field(() => Number, { nullable: true})
  @Prop({type: Number})
  delivery_charges?: Number;
}


export const AreaSchema = SchemaFactory.createForClass(Area)