import { Test, TestingModule } from '@nestjs/testing';
import { SmsResolver } from './sms.resolver';
import { SmsService } from './sms.service';

describe('SmsResolver', () => {
  let resolver: SmsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsResolver, SmsService],
    }).compile();

    resolver = module.get<SmsResolver>(SmsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
