import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { Address } from './entities/address.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';

@Resolver(() => Address)
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {}

  @Mutation(() => Address)
  createAddress(@Args('createAddressInput') createAddressInput: CreateAddressInput) {
    return this.addressesService.create(createAddressInput);
  }

  @Query(() => [Address], { name: 'getAddresses' })
  findAll(
    @Args('user_id', {type:()=>String}) user_id: string,
    @Args('limit', {type:()=> Number}) limit:number,
    @Args('offset', {type:()=> Number}) offset:number
  ) {
    return this.addressesService.findAll(user_id, limit, offset);
  }

  // @Query(() => Address, { name: 'address' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.addressesService.findOne(id);
  // }

  @Mutation(() => Address)
  updateAddress(@Args('updateAddressInput') updateAddressInput: UpdateAddressInput) {
    return this.addressesService.update(updateAddressInput.id, updateAddressInput);
  }

  @Mutation(() => Address)
  removeAddress(@Args('id', { type: () => String }) id: string) {
    return this.addressesService.remove(id);
  }
}
