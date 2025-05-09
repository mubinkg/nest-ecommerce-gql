import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantsResolver } from '../resolvers/product-variants.resolver';
import { ProductVariantsService } from '../services/product-variants.service';

describe('ProductVariantsResolver', () => {
  let resolver: ProductVariantsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVariantsResolver, ProductVariantsService],
    }).compile();

    resolver = module.get<ProductVariantsResolver>(ProductVariantsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
