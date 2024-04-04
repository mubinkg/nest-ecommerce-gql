import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SellersService } from './sellers.service';
import { Seller } from './entities/seller.entity';
import { CreateSellerInput } from './dto/create-seller.input';
import { UpdateSellerInput } from './dto/update-seller.input';
import { SellerAuthResponse } from './dto/seller-auth.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { SellerList } from './dto/seller-list.dto';

@Resolver(() => Seller)
export class SellersResolver {
  constructor(private readonly sellersService: SellersService) {}

  @Mutation(() => Seller)
  createSeller(@Args('createSellerInput') createSellerInput: CreateSellerInput) {
    return this.sellersService.create(createSellerInput);
  }

  @Query(() => SellerList, { name: 'sellers' })
  findAll(
    @Args('limit', {type: ()=>Number}) limit: number,
    @Args('offset', {type: ()=>Number}) offset: number,
  ) {
    return this.sellersService.findAll(limit, offset);
  }

  @Query(() => Seller, { name: 'seller' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.sellersService.findOne(id);
  }

  @Mutation(() => Seller)
  updateSeller(@Args('updateSellerInput') updateSellerInput: UpdateSellerInput) {
    return this.sellersService.update(updateSellerInput.id, updateSellerInput);
  }

  @Mutation(() => SellerAuthResponse, {name: 'signinSeller'})
  signinSeller(
    @Args('password', {type: ()=>String}) password: string,
    @Args('phone', {type: ()=>String}) mobile: string
  ) {
    return this.sellersService.signIn(password, mobile);
  }
}
