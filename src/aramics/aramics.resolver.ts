import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AramicsService } from './aramics.service';
import { Aramic } from './entities/aramic.entity';
import { CreateAramicInput } from './dto/create-aramic.input';
import { UpdateAramicInput } from './dto/update-aramic.input';
import { CryptoServie } from './crypto.service';

@Resolver(() => Aramic)
export class AramicsResolver {
  constructor(
    private readonly aramicsService: AramicsService,
    private readonly cryptoService:CryptoServie
  ) {}

  @Mutation(() => Aramic)
  createAramic(@Args('createAramicInput') createAramicInput: CreateAramicInput) {
    return this.aramicsService.create(createAramicInput);
  }

  @Query(() => String, { name: 'aramics' })
  findAll() {
    return this.cryptoService.encrypt('Mubin Mohammad Ikhtiar Khan')
  }

  @Query(() => Aramic, { name: 'aramic' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.aramicsService.findOne(id);
  }

  @Mutation(() => Aramic)
  updateAramic(@Args('updateAramicInput') updateAramicInput: UpdateAramicInput) {
    return this.aramicsService.update(updateAramicInput.id, updateAramicInput);
  }

  @Mutation(() => Aramic)
  removeAramic(@Args('id', { type: () => Int }) id: number) {
    return this.aramicsService.remove(id);
  }
}
