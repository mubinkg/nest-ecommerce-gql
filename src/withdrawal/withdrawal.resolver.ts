import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WithdrawalService } from './withdrawal.service';
import { Withdrawal } from './entities/withdrawal.entity';
import { CreateWithdrawalInput } from './dto/create-withdrawal.input';
import { UpdateWithdrawalInput } from './dto/update-withdrawal.input';

@Resolver(() => Withdrawal)
export class WithdrawalResolver {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Mutation(() => Withdrawal)
  createWithdrawal(@Args('createWithdrawalInput') createWithdrawalInput: CreateWithdrawalInput) {
    return this.withdrawalService.create(createWithdrawalInput);
  }

  @Query(() => [Withdrawal], { name: 'withdrawal' })
  findAll() {
    return this.withdrawalService.findAll();
  }

  @Query(() => Withdrawal, { name: 'withdrawal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.withdrawalService.findOne(id);
  }

  @Mutation(() => Withdrawal)
  updateWithdrawal(@Args('updateWithdrawalInput') updateWithdrawalInput: UpdateWithdrawalInput) {
    return this.withdrawalService.update(updateWithdrawalInput.id, updateWithdrawalInput);
  }

  @Mutation(() => Withdrawal)
  removeWithdrawal(@Args('id', { type: () => Int }) id: number) {
    return this.withdrawalService.remove(id);
  }
}
