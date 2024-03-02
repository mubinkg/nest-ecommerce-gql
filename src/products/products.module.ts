import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductTax, ProductTaxSchema } from './entities/product-tax.entity';
import { ProductTaxService } from './services/product-tax.service';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name, schema: ProductSchema
    },
    {
      name: ProductTax.name, schema: ProductTaxSchema
    },
  ]),ProductVariantsModule],
  providers: [ProductsResolver, ProductsService, ProductTaxService],
})
export class ProductsModule {}
