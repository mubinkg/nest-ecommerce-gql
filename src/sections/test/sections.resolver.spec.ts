import { Test, TestingModule } from '@nestjs/testing';
import { SectionsResolver } from '../resolvers/sections.resolver';
import { SectionsService } from '../services/sections.service';

describe('SectionsResolver', () => {
  let resolver: SectionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionsResolver, SectionsService],
    }).compile();

    resolver = module.get<SectionsResolver>(SectionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
