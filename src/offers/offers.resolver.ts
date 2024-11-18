import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OffersService } from './offers.service';
import { Offer } from './entities/offer.entity';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';

@Resolver(() => Offer)
export class OffersResolver {
  constructor(private readonly offersService: OffersService) {}

  @Mutation(() => Offer)
  createOffer(@Args('createOfferInput') createOfferInput: CreateOfferInput) {
    return this.offersService.create(createOfferInput);
  }

  @Query(() => [Offer], { name: 'offers' })
  findAll() {
    return this.offersService.findAll();
  }

  @Query(() => Offer, { name: 'offer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.offersService.findOne(id);
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
