import { Module } from '@nestjs/common';
import { WithdrawalService } from './services/withdrawal.service';
import { WithdrawalResolver } from './resolvers/withdrawal.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Withdrawal, WithdrawalSchema } from './entities/withdrawal.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: WithdrawalSchema,
        name: Withdrawal.name
      }
    ])
  ],
  providers: [WithdrawalResolver, WithdrawalService],
})
export class WithdrawalModule {}
