import { Test, TestingModule } from '@nestjs/testing';
import { AreasResolver } from './areas.resolver';
import { AreasService } from './areas.service';

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
