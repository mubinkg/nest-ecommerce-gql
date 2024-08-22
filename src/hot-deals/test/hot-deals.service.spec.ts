import { Test, TestingModule } from '@nestjs/testing';
import { HotDealsService } from '../services/hot-deals.service';

describe('HotDealsService', () => {
  let service: HotDealsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotDealsService],
    }).compile();

    service = module.get<HotDealsService>(HotDealsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
