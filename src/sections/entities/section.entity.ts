import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { SectionStyle } from '../enum/section-style.enum';

registerEnumType(SectionStyle, {
  name: 'SectionStyle'
})

@ObjectType()
@Schema({
  timestamps:true
})
export class Section {
  @Field(()=>String, {nullable:true})
  _id: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  title?:string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  description?:string

  @Field(()=>[String], {nullable:true})
  @Prop([{type:mongoose.Schema.Types.ObjectId, ref: 'Category'}])
  categories?:Category[]

  @Field(()=>SectionStyle, {defaultValue: SectionStyle.DEFAULT})
  @Prop({type:String})
  style?:SectionStyle

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  productType?:string
}

export const SectionSchema = SchemaFactory.createForClass(Section)
export type SectionDocuement = HydratedDocument<Section>
