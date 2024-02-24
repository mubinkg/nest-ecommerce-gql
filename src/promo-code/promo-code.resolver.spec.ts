import { Test, TestingModule } from '@nestjs/testing';
import { PromoCodeResolver } from './promo-code.resolver';
import { PromoCodeService } from './promo-code.service';

describe('PromoCodeResolver', () => {
  let resolver: PromoCodeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoCodeResolver, PromoCodeService],
    }).compile();

    resolver = module.get<PromoCodeResolver>(PromoCodeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
