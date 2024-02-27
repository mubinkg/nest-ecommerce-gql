import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributesResolver } from './product-attributes.resolver';
import { ProductAttributesService } from './product-attributes.service';

describe('ProductAttributesResolver', () => {
  let resolver: ProductAttributesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductAttributesResolver, ProductAttributesService],
    }).compile();

    resolver = module.get<ProductAttributesResolver>(ProductAttributesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
