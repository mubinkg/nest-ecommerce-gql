import { ObjectType, Field, Int } from '@nestjs/graphql';
import { StockStatus } from '../enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProductAttributeValue } from 'src/product-attributes/entities/product-attribute-value.entity';
import { Product } from 'src/products/entities/product.entity';


@ObjectType()
@Schema({ timestamps: true })
export class ProductVariant {
  @Field(() => String, { description: 'Regular Price' })
  _id?:string;
  
  @Field(() => Number, { description: 'Regular Price' })
  @Prop({ type: Number })
  price?: number;

  @Field(() => Number, { description: 'Price after discount', nullable: true })
  @Prop({ type: Number })
  specialPrice?: number;

  @Field(() => Number, { description: 'Unit (kg)', nullable: true })
  @Prop({ type: Number })
  weight?: number;

  @Field(() => Number, { description: "", nullable: true })
  @Prop({ type: Number })
  height?: number;

  @Field(() => Number, { description: "", nullable: true })
  @Prop({ type: Number })
  breadth?: number;

  @Field(() => Number, { description: "", nullable: true })
  @Prop({ type: Number })
  length?: number;

  @Field(() => String, { description: "Stock Keeping Unit", nullable: true })
  @Prop({ type: String })
  sku?: string;

  @Field(() => Number, { description: "", nullable: true })
  @Prop({ type: Number })
  totalStock?: number;

  @Field(() => String, { description: "", nullable: true })
  @Prop({ type: String })
  stockStatus?: StockStatus;

 //variant reference id 
  @Field(() => String, { description: "If variants is missing it will be general variant", nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductAttribute'})
  attributeReference?: string;

  @Field(() => ProductAttributeValue, { description: "Attribute Values", nullable: true })
  attributes?:  ProductAttributeValue;

  @Field(() => Product, { description: "Product Reference Id", nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId , ref: 'Product'})
  product?: Product

}
export type ProductVariantDocument = HydratedDocument<ProductVariant>
export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant)