import { Test, TestingModule } from '@nestjs/testing';
import { HotDealsResolver } from '../resolvers/hot-deals.resolver';
import { HotDealsService } from '../services/hot-deals.service';

describe('HotDealsResolver', () => {
  let resolver: HotDealsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotDealsResolver, HotDealsService],
    }).compile();

    resolver = module.get<HotDealsResolver>(HotDealsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
