import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawalResolver } from './withdrawal.resolver';
import { WithdrawalService } from './withdrawal.service';

describe('WithdrawalResolver', () => {
  let resolver: WithdrawalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WithdrawalResolver, WithdrawalService],
    }).compile();

    resolver = module.get<WithdrawalResolver>(WithdrawalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
