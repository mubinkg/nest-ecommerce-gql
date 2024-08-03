import { Module } from '@nestjs/common';
import { WithdrawalService } from './services/withdrawal.service';
import { WithdrawalResolver } from './resolvers/withdrawal.resolver';

@Module({
  providers: [WithdrawalResolver, WithdrawalService],
})
export class WithdrawalModule {}
