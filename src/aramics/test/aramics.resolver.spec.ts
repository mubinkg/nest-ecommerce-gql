import { Test, TestingModule } from '@nestjs/testing';
import { AramicsResolver } from './aramics.resolver';
import { AramicsService } from './aramics.service';

describe('AramicsResolver', () => {
  let resolver: AramicsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AramicsResolver, AramicsService],
    }).compile();

    resolver = module.get<AramicsResolver>(AramicsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
