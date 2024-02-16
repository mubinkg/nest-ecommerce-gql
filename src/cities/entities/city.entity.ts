import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>

@ObjectType()
@Schema()
export class City {
  
  @Field(()=>String)
  _id: string

  @Field(() => String, { nullable: true })
  @Prop({type: String})
  city_name:string;
}

export const CitySchema = SchemaFactory.createForClass(City)
