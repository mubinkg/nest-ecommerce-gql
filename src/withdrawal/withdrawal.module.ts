import { Module } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalResolver } from './withdrawal.resolver';

@Module({
  providers: [WithdrawalResolver, WithdrawalService],
})
export class WithdrawalModule {}
