import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributesResolver } from '../resolvers/product-attributes.resolver';
import { ProductAttributesService } from '../service/product-attributes.service';

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
