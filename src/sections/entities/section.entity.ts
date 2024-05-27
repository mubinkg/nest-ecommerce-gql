import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { SectionStyle } from '../enum/section-style.enum';
import { Product } from 'src/products/entities/product.entity';
import { ProductTypes } from '../enum/product-type.enum';

registerEnumType(SectionStyle, {
  name: 'SectionStyle'
})

registerEnumType(ProductTypes,{
  name: "ProductTypes"
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

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  order:number

  @Field(()=>[String], {nullable:true})
  @Prop([{type:mongoose.Schema.Types.ObjectId, ref: 'Category'}])
  categories?:Category[]

  @Field(()=>SectionStyle, {defaultValue: SectionStyle.DEFAULT})
  @Prop({type:String})
  style?:SectionStyle

  @Field(()=>ProductTypes, {nullable:true})
  @Prop({type:String})
  productType?:ProductTypes

  @Field(()=>[Product], {nullable:true})
  @Prop([{type: mongoose.Schema.Types.ObjectId, ref:'Product'}])
  products?: Product[]

  @Field(()=>Date, {nullable:true})
  createdAt:Date
}

export const SectionSchema = SchemaFactory.createForClass(Section)
export type SectionDocuement = HydratedDocument<Section>
