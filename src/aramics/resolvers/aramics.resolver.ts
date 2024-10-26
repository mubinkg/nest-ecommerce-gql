import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AramicsService } from '../services/aramics.service';
import { Deliverycharge } from '../entities/aramic.entity';
import { CreateAramicInput } from '../dto/create-aramic.input';
import { UpdateAramicInput } from '../dto/update-aramic.input';
import { CryptoServie } from '../services/crypto.service';
import { DeliveryCharge } from '../dto/delivery-charge.input';

@Resolver(() => Deliverycharge)
export class AramicsResolver {
  constructor(
    private readonly aramicsService: AramicsService,
    private readonly cryptoService:CryptoServie
  ) {}

  @Mutation(() => Deliverycharge)
  createAramic(@Args('createAramicInput') createAramicInput: CreateAramicInput) {
    return this.aramicsService.create(createAramicInput);
  }

  @Query(() => String, { name: 'aramics' })
  findAll() {
    return this.cryptoService.encrypt('Mubin Mohammad Ikhtiar Khan')
  }

  @Query(() => Number, { name: 'deliveryCharge' })
  findOne(@Args('deliveryCharge') deliveryCharge: DeliveryCharge) {
    return this.aramicsService.findOne(deliveryCharge);
  }

  @Query(() => [String], { name: 'getDeliverableCountries' })
  getCountries() {
    return this.aramicsService.getCountries();
  }

  @Mutation(() => Deliverycharge)
  updateAramic(@Args('updateAramicInput') updateAramicInput: UpdateAramicInput) {
    return this.aramicsService.update(updateAramicInput.id, updateAramicInput);
  }

  @Mutation(() => Deliverycharge)
  removeAramic(@Args('id', { type: () => Int }) id: number) {
    return this.aramicsService.remove(id);
  }
}
