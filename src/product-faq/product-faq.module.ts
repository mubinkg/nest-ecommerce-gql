import { Module } from '@nestjs/common';
import { ProductFaqService } from './product-faq.service';
import { ProductFaqResolver } from './product-faq.resolver';

@Module({
  providers: [ProductFaqResolver, ProductFaqService],
})
export class ProductFaqModule {}
