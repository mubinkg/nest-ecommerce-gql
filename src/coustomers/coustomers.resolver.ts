import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoustomersService } from './coustomers.service';
import { Coustomer } from './entities/coustomer.entity';
import { CreateCoustomerInput } from './dto/create-coustomer.input';
import { UpdateCoustomerInput } from './dto/update-coustomer.input';

@Resolver(() => Coustomer)
export class CoustomersResolver {
  constructor(private readonly coustomersService: CoustomersService) {}

  @Mutation(() => Coustomer, {name: 'registerUser'})
  createCoustomer(@Args('createCoustomerInput') createCoustomerInput: CreateCoustomerInput) {
    return this.coustomersService.create(createCoustomerInput);
  }

  @Query(() => [Coustomer], { name: 'coustomers' })
  findAll() {
    return this.coustomersService.findAll();
  }

  @Query(() => Coustomer, { name: 'coustomer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coustomersService.findOne(id);
  }

  @Mutation(() => Coustomer)
  updateCoustomer(@Args('updateCoustomerInput') updateCoustomerInput: UpdateCoustomerInput) {
    return this.coustomersService.update(updateCoustomerInput.id, updateCoustomerInput);
  }

  @Mutation(() => Coustomer)
  removeCoustomer(@Args('id', { type: () => Int }) id: number) {
    return this.coustomersService.remove(id);
  }
}
