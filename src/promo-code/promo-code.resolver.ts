import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromoCodeService } from './promo-code.service';
import { PromoCode } from './entities/promo-code.entity';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';

@Resolver(() => PromoCode)
export class PromoCodeResolver {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Mutation(() => PromoCode)
  async createPromoCode(@Args('createPromoCodeInput') createPromoCodeInput: CreatePromoCodeInput) {
    return await this.promoCodeService.createPromoCode(createPromoCodeInput)
  }

  @Mutation(() => PromoCode)
  async validatePromoCode(
    @Args('code') code: string,
    @Args('orderFinalAmount') orderFinalAmount: number,
    ) {
    return await this.promoCodeService.validatePromoCode(code,orderFinalAmount)
  }

  @Query(() => [PromoCode], { name: 'promoCode' })
  findAll() {
    return this.promoCodeService.findAll();
  }

  @Query(() => PromoCode, { name: 'promoCode' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.promoCodeService.findOne(id);
  }

  @Mutation(() => PromoCode)
  updatePromoCode(@Args('updatePromoCodeInput') updatePromoCodeInput: UpdatePromoCodeInput) {
    return this.promoCodeService.update(updatePromoCodeInput.id, updatePromoCodeInput);
  }

  @Mutation(() => PromoCode)
  removePromoCode(@Args('id', { type: () => Int }) id: number) {
    return this.promoCodeService.remove(id);
  }
}
