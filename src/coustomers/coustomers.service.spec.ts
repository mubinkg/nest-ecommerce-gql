import { Test, TestingModule } from '@nestjs/testing';
import { CoustomersService } from './coustomers.service';

describe('CoustomersService', () => {
  let service: CoustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoustomersService],
    }).compile();

    service = module.get<CoustomersService>(CoustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
