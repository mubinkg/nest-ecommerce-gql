import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { StockStatus } from '../enum';
registerEnumType(StockStatus,{
  name:"StockStatus"
})
@InputType()
export class CreateProductVariantInput {
  @Field(() => Number, { description: 'Regular Price' })
  price?: number;

  @Field(() => Number, { description: 'Price after discount', nullable: true })
  specialPrice?: number;

  @Field(() => Number, { description: 'Unit (kg)', nullable: true })
  weight?: number;

  @Field(() => Number, { description: "", nullable: true })
  height?: number;

  @Field(() => Number, { description: "", nullable: true })
  breadth?: number;

  @Field(() => Number, { description: "", nullable: true })
  length?: number;

  @Field(() => String, { description: "Stock Keeping Unit", nullable: true })
  sku?: string;

  @Field(() => Number, { description: "", nullable: true })
  totalStock?: number;

  @Field(() => StockStatus, { description: "", nullable: true })
  stockStatus?: StockStatus;

  @Field(() => String, { description: "If variants is missing it will be general variant", nullable: true })
  attributeReference?: string;


  @Field(() => String, { description: "Product Reference Id", nullable: true })
  productId?: string
}
