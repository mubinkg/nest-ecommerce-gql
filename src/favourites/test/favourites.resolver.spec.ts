import { Test, TestingModule } from '@nestjs/testing';
import { FavouritesResolver } from '../resolvers/favourites.resolver';
import { FavouritesService } from '../services/favourites.service';

describe('FavouritesResolver', () => {
  let resolver: FavouritesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouritesResolver, FavouritesService],
    }).compile();

    resolver = module.get<FavouritesResolver>(FavouritesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
