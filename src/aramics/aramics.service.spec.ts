import { Test, TestingModule } from '@nestjs/testing';
import { AramicsService } from './aramics.service';

describe('AramicsService', () => {
  let service: AramicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AramicsService],
    }).compile();

    service = module.get<AramicsService>(AramicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
