import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsResolver } from './resolvers/transactions.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema:TransactionSchema,
        name: Transaction.name
      }
    ])
  ],
  providers: [TransactionsResolver, TransactionsService],
})
export class TransactionsModule {}
