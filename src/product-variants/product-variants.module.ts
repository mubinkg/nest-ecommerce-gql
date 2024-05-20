import { Module } from '@nestjs/common';
import { ProductVariantsService } from './services/product-variants.service';
import { ProductVariantsResolver } from './resolvers/product-variants.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductVariant, ProductVariantSchema } from './entities/product-variant.entity';
import { AdminProductVariantResolver } from './resolvers/admin-product-variant.resolver';
import { AdminProductVariantService } from './services/admin-product-variant.service';

@Module({
  imports: [MongooseModule.forFeature([{
    name: ProductVariant.name,
    schema: ProductVariantSchema
  }])],
  exports:[ProductVariantsService],
  providers: [ProductVariantsResolver, ProductVariantsService, AdminProductVariantResolver, AdminProductVariantService],
})
export class ProductVariantsModule { }
