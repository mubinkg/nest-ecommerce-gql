import { Module } from '@nestjs/common';
import { ProductVariantsService } from './services/product-variants.service';
import { ProductVariantsResolver } from './resolvers/product-variants.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductVariant, ProductVariantSchema } from './entities/product-variant.entity';

@Module({
  imports: [MongooseModule.forFeature([{
    name: ProductVariant.name,
    schema: ProductVariantSchema
  }])],
  exports:[ProductVariantsService],
  providers: [ProductVariantsResolver, ProductVariantsService],
})
export class ProductVariantsModule { }
