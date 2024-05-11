import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose'
import { HalalIndicator } from '../enum/halal-indicator.enum';
import { DownloadLinkType } from '../enum/download-link-type.enum';
import { Brand } from 'src/brands/entities/brand.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Seller } from 'src/sellers/entities/seller.entity';

export type ProductDocument = HydratedDocument<Product>

@ObjectType()
@Schema({timestamps:true})
export class Product {
  @Field(() => String, {nullable:true})
  _id: string;

  @Field(()=>Seller, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Seller'})
  seller?: Seller

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  pro_input_name?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  short_description?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  tags?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String, enum: HalalIndicator})
  indicator?: HalalIndicator

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  made_in?: string

  @Field(()=>Brand, {nullable:true})
  @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Brand"})    //brand id object id??
  brand?: Brand

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  total_allowed_quantity?: number

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  minimum_order_quantity?: number

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  quantity_step_size?: number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  warranty_period?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  guarantee_period?: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  download_allowed?: number

  @Field(()=>DownloadLinkType, {nullable:true})
  @Prop({type:String})
  download_link_type?: DownloadLinkType

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  pro_input_zip?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  download_link?: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  is_returnable?: number

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  is_cancelable: number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  cancelable_till?: string

  @Field(()=>String, {nullable:true})
  @Prop({type: String})
  pro_input_image?: string

  @Field(()=>[String], {nullable:true})
  @Prop([{type:String}])
  other_images?: string[]

  @Field(()=>String, {nullable: true})
  @Prop({type:String})
  video_type?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  video?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  pro_input_video?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  pro_input_description?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  extra_input_description?: string

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  attribute_values?: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  status?: number

  @Field(()=>Category, {nullable:true})
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
  category?: Category

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  tax?: number

  @Field(()=>String, {nullable:true})
  @Prop({type:String})
  product_type?: string

  @Field(()=>Number, {nullable:true})
  @Prop({type:Number})
  globalOrderNo?: number

}

export const ProductSchema = SchemaFactory.createForClass(Product)