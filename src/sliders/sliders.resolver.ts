import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SlidersService } from './sliders.service';
import { Slider } from './entities/slider.entity';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';

@Resolver(() => Slider)
export class SlidersResolver {
  constructor(private readonly slidersService: SlidersService) {}

  @Mutation(() => Slider)
  createSlider(@Args('createSliderInput') createSliderInput: CreateSliderInput) {
    return this.slidersService.create(createSliderInput);
  }

  @Query(() => [Slider], { name: 'sliders' })
  findAll() {
    return this.slidersService.findAll();
  }

  @Query(() => Slider, { name: 'slider' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.slidersService.findOne(id);
  }

  @Mutation(() => Slider)
  updateSlider(@Args('updateSliderInput') updateSliderInput: UpdateSliderInput) {
    return this.slidersService.update(updateSliderInput.id, updateSliderInput);
  }

  @Mutation(() => Slider)
  removeSlider(@Args('id', { type: () => Int }) id: number) {
    return this.slidersService.remove(id);
  }
}
