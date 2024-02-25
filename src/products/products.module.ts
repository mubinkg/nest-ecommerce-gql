import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductTax, ProductTaxSchema } from './entities/product-tax.entity';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name, schema: ProductSchema
    },
    {
      name: ProductTax.name, schema: ProductTaxSchema
    }
  ])],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
