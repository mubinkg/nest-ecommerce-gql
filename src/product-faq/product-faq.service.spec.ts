import { Test, TestingModule } from '@nestjs/testing';
import { ProductFaqService } from './product-faq.service';

describe('ProductFaqService', () => {
  let service: ProductFaqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFaqService],
    }).compile();

    service = module.get<ProductFaqService>(ProductFaqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
