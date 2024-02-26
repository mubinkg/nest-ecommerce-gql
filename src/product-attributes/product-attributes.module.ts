import { Module } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttributesResolver } from './product-attributes.resolver';

@Module({
  providers: [ProductAttributesResolver, ProductAttributesService],
})
export class ProductAttributesModule {}
