import { Test, TestingModule } from '@nestjs/testing';
import { AreasResolver } from '../resolvers/areas.resolver';
import { AreasService } from '../services/areas.service';

describe('AreasResolver', () => {
  let resolver: AreasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreasResolver, AreasService],
    }).compile();

    resolver = module.get<AreasResolver>(AreasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
