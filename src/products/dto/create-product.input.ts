import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsTaxId } from 'class-validator';
import { CreateProductVariantInput } from 'src/product-variants/dto/create-product-variant.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { VariantStockLavelEnum ,ProductType, VideoType, CancelableTill, HalalIndicator, DownloadLinkType} from '../enum';
import { ImageInput } from 'src/ratings/dto/rating-images';


registerEnumType(HalalIndicator,{
  'name': "HalalIndicator"
})

registerEnumType(DownloadLinkType, {
  name:'DownloadLinkType'
})

registerEnumType(CancelableTill, {
  name: 'CancelableTill'
})

registerEnumType(VideoType, {
  name: 'VideoType'
})

registerEnumType(ProductType, {
  name: 'ProductType'
})

registerEnumType(VariantStockLavelEnum, {
  name: 'VariantStockLavelEnum'
})

@InputType()
export class CreateProductInput {

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  seller: string

  @Field(()=>String)
  @IsNotEmpty()
  @IsString()
  pro_input_name: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  short_description: string

  @Field(()=>String, {nullable:true, description: 'Comma seperated string'})
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

  @Field(()=>String, {nullable:true})
  @IsOptional()
  download_link_type?: string

  @Field(()=>GraphQLUpload, {nullable:true})
  pro_input_zip?: FileUpload | string

  @Field(()=>String, {nullable:true})
  @IsOptional()
  @IsString()
  download_link?: string

  @Field(()=>Number, {nullable:true})
  @IsOptional()
  @IsNumber()
  is_returnable?: number

  @Field(()=>Number, {nullable:true})
  @IsOptional()
  @IsNumber()
  is_cancelable?: number

  @Field(()=>CancelableTill, {nullable:true})
  @IsOptional()
  @IsEnum(CancelableTill)
  cancelable_till?: CancelableTill

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  pro_input_image?: String

  @Field(()=>[String], {nullable:true})
  @IsArray()
  @IsString()
  other_images?: string[]

  @Field(()=>VideoType, {nullable:true})
  @IsOptional()
  @IsEnum(VideoType)
  video_type?: VideoType

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsOptional()
  video?: string

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsOptional()
  pro_input_description?: string

  @Field(()=>String, {nullable:true})
  @IsString()
  @IsOptional()
  extra_input_description?: string

  @Field(()=>String, {nullable:true, description: 'comma separated string'})
  @IsString()
  @IsOptional()
  attribute_values?: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  category: string

  @Field(()=>Number, {nullable:true})
  status: number

  @Field(()=>ProductType, {nullable:true})
  @IsOptional()
  @IsEnum(ProductType)
  product_type?: ProductType

  @Field(()=>VariantStockLavelEnum, {nullable:true})
  @IsOptional()
  @IsEnum(VariantStockLavelEnum)
  variant_stock_level_type?: VariantStockLavelEnum

  @Field(()=>[CreateProductVariantInput],{description:"Product Variants Details"})
  createProductVariantInput?:CreateProductVariantInput[]

  globalOrderNo?: number
}
