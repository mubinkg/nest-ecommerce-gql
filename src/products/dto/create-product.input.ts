import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsTaxId } from 'class-validator';
import { CreateProductVariantInput } from 'src/product-variants/dto/create-product-variant.input';
import { HalalIndicator } from '../enum/halal-indicator.enum';
import { DownloadLinkType } from '../enum/download-link-type.enum';
import { FileUpload, GraphQLUpload } from 'graphql-upload';


registerEnumType(HalalIndicator,{
  'name': "HalalIndicator"
})

registerEnumType(DownloadLinkType, {
  name:'DownloadLinkType'
})

@InputType()
export class CreateProductInput {

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  seller_id: string

  @Field(()=>String)
  @IsNotEmpty()
  @IsString()
  pro_input_name: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  short_description: string

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsOptional()
  tags?: string

  @Field(()=>HalalIndicator, {defaultValue: HalalIndicator.NONE,nullable:true})
  @IsEnum(HalalIndicator)
  @IsNotEmpty()
  indicator: HalalIndicator

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsOptional()
  made_in?: string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  brand?: string

  @Field(()=>Number, {nullable:true})
  @IsNumber()
  @IsOptional()
  total_allowed_quantity?: number

  @Field(()=>Number, {nullable:true})
  @IsNumber()
  @IsOptional()
  minimum_order_quantity?: number

  @Field(()=>Number, {nullable:true})
  @IsNumber()
  @IsOptional()
  quantity_step_size?: number

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  warranty_period?: string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  guarantee_period?: string

  @Field(()=>Number, {nullable:true})
  @IsOptional()
  @IsNumber()
  download_allowed?: number

  @Field(()=>DownloadLinkType, {nullable:true})
  @IsOptional()
  @IsEnum(DownloadLinkType)
  download_link_type?: DownloadLinkType

  @Field(()=>GraphQLUpload, {nullable:true})
  pro_input_zip?: FileUpload | string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  download_link?: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  category_id: string

  @Field(()=>Number, {nullable:true})
  tax: number

  @Field(()=>String, {nullable:true})
  type: string

  @Field(()=>Number, {nullable:true})
  stock_type: number

  @Field(()=>Number, {nullable:true})
  cod_allowed: number

  @Field(()=>Boolean, {nullable:true})
  is_prices_inclusive_tax: boolean

  @Field(()=>Boolean, {nullable:true})
  is_returnable: boolean

  @Field(()=>Boolean, {nullable:true})
  is_cancelable: boolean

  @Field(()=>Date, {nullable:true})
  cancelable_till: Date

  @Field(()=>String, {nullable:true})
  image: string

  @Field(()=>String, {nullable:true})
  video_type: string

  @Field(()=>String, {nullable:true})
  video: string

  @Field(()=>String, {nullable:true})
  sku: string

  @Field(()=>Number, {nullable:true})
  stock: number

  @Field(()=>Number, {nullable:true})
  availability: number

  @Field(()=>String, {nullable:true})
  description: string

  @Field(()=>String, {nullable:true})
  deliverable_type: string

  @Field(()=>String, {nullable:true})
  deliverable_zipcodes: string

  @Field(()=>String, {nullable:true})
  variant_id: string

  @Field(()=>CreateProductVariantInput,{description:"Product Variants Details"})
  createProductVariantInput?:CreateProductVariantInput
}
