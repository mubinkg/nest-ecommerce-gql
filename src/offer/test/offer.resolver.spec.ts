import { Test, TestingModule } from '@nestjs/testing';
import { OfferResolver } from '../resolvers/offer.resolver';
import { OfferService } from '../services/offer.service';

describe('OfferResolver', () => {
  let resolver: OfferResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OfferResolver, OfferService],
    }).compile();

    resolver = module.get<OfferResolver>(OfferResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
