import { Test, TestingModule } from '@nestjs/testing';
import { BrandsResolver } from '../resolvers/brands.resolver';
import { BrandsService } from '../services/brands.service';

describe('BrandsResolver', () => {
  let resolver: BrandsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsResolver, BrandsService],
    }).compile();

    resolver = module.get<BrandsResolver>(BrandsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
