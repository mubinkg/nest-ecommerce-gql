import { Test, TestingModule } from '@nestjs/testing';
import { FlashSellResolver } from '../resolvers/flash-sell.resolver';
import { FlashSellService } from '../services/flash-sell.service';

describe('FlashSellResolver', () => {
  let resolver: FlashSellResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlashSellResolver, FlashSellService],
    }).compile();

    resolver = module.get<FlashSellResolver>(FlashSellResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
