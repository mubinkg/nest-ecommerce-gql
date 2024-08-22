import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HotDealsService } from '../services/hot-deals.service';
import { HotDeal } from '../entities/hot-deal.entity';
import { CreateHotDealInput } from '../dto/create-hot-deal.input';
import { UpdateHotDealInput } from '../dto/update-hot-deal.input';

@Resolver(() => HotDeal)
export class HotDealsResolver {
  constructor(private readonly hotDealsService: HotDealsService) {}

  @Mutation(() => HotDeal)
  createHotDeal(@Args('createHotDealInput') createHotDealInput: CreateHotDealInput) {
    return this.hotDealsService.create(createHotDealInput);
  }

  @Query(() => [HotDeal], { name: 'hotDeals' })
  findAll() {
    return this.hotDealsService.findAll();
  }

  @Query(() => HotDeal, { name: 'hotDeal' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hotDealsService.findOne(id);
  }

  @Mutation(() => HotDeal)
  updateHotDeal(@Args('updateHotDealInput') updateHotDealInput: UpdateHotDealInput) {
    return this.hotDealsService.update(updateHotDealInput.id, updateHotDealInput);
  }

  @Mutation(() => HotDeal)
  removeHotDeal(@Args('id', { type: () => Int }) id: number) {
    return this.hotDealsService.remove(id);
  }
}
