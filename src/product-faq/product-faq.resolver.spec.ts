import { Test, TestingModule } from '@nestjs/testing';
import { ProductFaqResolver } from './product-faq.resolver';
import { ProductFaqService } from './product-faq.service';

describe('ProductFaqResolver', () => {
  let resolver: ProductFaqResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFaqResolver, ProductFaqService],
    }).compile();

    resolver = module.get<ProductFaqResolver>(ProductFaqResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
