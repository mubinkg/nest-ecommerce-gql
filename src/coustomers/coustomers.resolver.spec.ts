import { Test, TestingModule } from '@nestjs/testing';
import { CoustomersResolver } from './coustomers.resolver';
import { CoustomersService } from './coustomers.service';

describe('CoustomersResolver', () => {
  let resolver: CoustomersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoustomersResolver, CoustomersService],
    }).compile();

    resolver = module.get<CoustomersResolver>(CoustomersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
