import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AramicsService } from '../services/aramics.service';
import { Deliverycharge } from '../entities/aramic.entity';
import { CreateAramicInput } from '../dto/create-aramic.input';
import { UpdateAramicInput } from '../dto/update-aramic.input';
import { CryptoServie } from '../services/crypto.service';

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

  @Query(() => Deliverycharge, { name: 'deliveryCharge' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.aramicsService.findOne(id);
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
