import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionsService } from '../services/transactions.service';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionInput } from '../dto/create-transaction.input';
import { UpdateTransactionInput } from '../dto/update-transaction.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction)
  createTransaction(
      @Args('createTransactionInput') createTransactionInput: CreateTransactionInput,
      @CurrentUser('user') user:any
    ) {
    return this.transactionsService.create(createTransactionInput, user);
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
    return this.transactionsService.update(updateTransactionInput.id, updateTransactionInput);
  }

  @Mutation(() => Transaction)
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.remove(id);
  }
}
