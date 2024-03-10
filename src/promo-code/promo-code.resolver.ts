import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PromoCodeService } from './promo-code.service';
import { PromoCode } from './entities/promo-code.entity';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { GetPromoCodesInput } from './dto/get-promo-code.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';

@Resolver(() => PromoCode)
export class PromoCodeResolver {
  constructor(private readonly promoCodeService: PromoCodeService) {}

  @Mutation(() => PromoCode)
  async createPromoCode(@Args('createPromoCodeInput') createPromoCodeInput: CreatePromoCodeInput) {
    return await this.promoCodeService.createPromoCode(createPromoCodeInput)
  }

  @Mutation(() => PromoCode)
  @UseGuards(GqlAuthGuard)
  async validatePromoCode(
    @Args('code') code: string,
    @Args('orderFinalAmount') orderFinalAmount: number,
    @CurrentUser('user') user :any
    ) {
    return await this.promoCodeService.validatePromoCode(code,orderFinalAmount,user?.id)
  }

  @Query(() => [PromoCode], { name: 'promoCode' })
  @UseGuards(GqlAuthGuard)
  async getPromoCodes(
    @Args('getPromocodesInput') getPromocodesInput: GetPromoCodesInput,
  ) {
    return this.promoCodeService.getPromoCodes(getPromocodesInput);
  }

}
