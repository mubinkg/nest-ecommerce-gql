import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { CreateProductVariantInput } from 'src/product-variants/dto/create-product-variant.input';
import { ProductType } from '../data/enum';
registerEnumType(ProductType, {
  name: 'ProductType',
})
@InputType()
export class CreateProductInput {
  @Field(()=>String, {nullable:true})
  category_id: string

  @Field(()=>Number, {nullable:true})
  tax: number

  @Field(()=>ProductType, {nullable:true})
  type?: ProductType

  @Field(()=>Number, {nullable:true})
  stock_type: number

  @Field(()=>String, {nullable:true})
  name: string

  @Field(()=>String, {nullable:true})
  short_description: string

  @Field(()=>String, {nullable:true})
  indicator: string

  @Field(()=>Number, {nullable:true})
  cod_allowed: number

  @Field(()=>Number, {nullable:true})
  minimum_order_quantity: number

  @Field(()=>Number, {nullable:true})
  quantity_step_size: number

  @Field(()=>Number, {nullable:true})
  total_allowed_quantity: number

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
  tags: string

  @Field(()=>String, {nullable:true})
  warranty_period: string

  @Field(()=>String, {nullable:true})
  made_in: string

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
  seller_id: string

  @Field(()=>String, {nullable:true})
  variant_id: string

  @Field(()=>CreateProductVariantInput,{description:"Product Variants Details"})
  createProductVariantInput?:CreateProductVariantInput

 
}
