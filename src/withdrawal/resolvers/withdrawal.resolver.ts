import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WithdrawalService } from '../services/withdrawal.service';
import { Withdrawal } from '../entities/withdrawal.entity';
import { CreateWithdrawalInput } from '../dto/create-withdrawal.input';
import { UpdateWithdrawalInput } from '../dto/update-withdrawal.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver(() => Withdrawal)
export class WithdrawalResolver {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Mutation(() => Withdrawal)
  @UseGuards(GqlAuthGuard)
  createWithdrawal(
    @Args('createWithdrawalInput') createWithdrawalInput: CreateWithdrawalInput,
    @CurrentUser('user') user:any
  ) {
    return this.withdrawalService.create(createWithdrawalInput, user);
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
