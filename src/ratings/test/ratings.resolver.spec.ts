import { Test, TestingModule } from '@nestjs/testing';
import { RatingsResolver } from '../resolvers/ratings.resolver';
import { RatingsService } from '../services/ratings.service';

describe('RatingsResolver', () => {
  let resolver: RatingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingsResolver, RatingsService],
    }).compile();

    resolver = module.get<RatingsResolver>(RatingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
