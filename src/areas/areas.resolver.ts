import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AreasService } from './areas.service';
import { Area } from './entities/area.entity';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';

@Resolver(() => Area)
export class AreasResolver {
  constructor(private readonly areasService: AreasService) {}

  @Mutation(() => Area)
  createArea(@Args('createAreaInput') createAreaInput: CreateAreaInput) {
    return this.areasService.create(createAreaInput);
  }

  @Query(() => [Area], { name: 'areas' })
  findAll() {
    return this.areasService.findAll();
  }

  @Query(() => Area, { name: 'area' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.areasService.findOne(id);
  }

  @Mutation(() => Area)
  updateArea(@Args('updateAreaInput') updateAreaInput: UpdateAreaInput) {
    return this.areasService.update(updateAreaInput.id, updateAreaInput);
  }

  @Mutation(() => Area)
  removeArea(@Args('id', { type: () => Int }) id: number) {
    return this.areasService.remove(id);
  }
}
