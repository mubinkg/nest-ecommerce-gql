import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FlashSellService } from './flash-sell.service';
import { FlashSell } from './entities/flash-sell.entity';
import { CreateFlashSellInput } from './dto/create-flash-sell.input';
import { UpdateFlashSellInput } from './dto/update-flash-sell.input';

@Resolver(() => FlashSell)
export class FlashSellResolver {
  constructor(private readonly flashSellService: FlashSellService) {}

  @Mutation(() => FlashSell)
  createFlashSell(@Args('createFlashSellInput') createFlashSellInput: CreateFlashSellInput) {
    return this.flashSellService.create(createFlashSellInput);
  }

  @Query(() => [FlashSell], { name: 'flashSell' })
  findAll() {
    return this.flashSellService.findAll();
  }

  @Query(() => FlashSell, { name: 'flashSell' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.flashSellService.findOne(id);
  }

  @Mutation(() => FlashSell)
  updateFlashSell(@Args('updateFlashSellInput') updateFlashSellInput: UpdateFlashSellInput) {
    return this.flashSellService.update(updateFlashSellInput.id, updateFlashSellInput);
  }

  @Mutation(() => FlashSell)
  removeFlashSell(@Args('id', { type: () => Int }) id: number) {
    return this.flashSellService.remove(id);
  }
}
