import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Product.name, schema: ProductSchema
    },
  ]),ProductVariantsModule],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
