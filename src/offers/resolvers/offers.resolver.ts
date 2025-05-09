import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OffersService } from "../services/offers.service";
import { Offer } from '../entities/offer.entity';
import { CreateOfferInput } from '../dto/create-offer.input';
import { UpdateOfferInput } from '../dto/update-offer.input';

@Resolver(() => Offer)
export class OffersResolver {
  constructor(private readonly offersService: OffersService) {}

  @Mutation(() => Offer)
  createOffer(@Args('createOfferInput') createOfferInput: CreateOfferInput) {
    return this.offersService.create(createOfferInput);
  }

  @Query(() => [Offer], { name: 'offers' })
  findAll(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number
  ) {
    return this.offersService.findAll(limit, offset);
  }

  @Query(() => Offer, { name: 'offer' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @Args('type', { type: () => String }) type: string
  ) {
    return this.offersService.findOne(id, type);
  }

  @Mutation(() => Offer)
  updateOffer(@Args('updateOfferInput') updateOfferInput: UpdateOfferInput) {
    return this.offersService.update(updateOfferInput.id, updateOfferInput);
  }

  @Mutation(() => Offer)
  removeOffer(@Args('id', { type: () => Int }) id: number) {
    return this.offersService.remove(id);
  }
}
