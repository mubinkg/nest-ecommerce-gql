import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BrandsService } from '../services/brands.service';
import { Brand } from '../entities/brand.entity';
import { CreateBrandInput } from '../dto/create-brand.input';
import { UpdateBrandInput } from '../dto/update-brand.input';
import { BrandList } from '../dto/brand-list.dto';

@Resolver(() => Brand)
export class BrandsResolver {
  constructor(private readonly brandsService: BrandsService) {}

  @Mutation(() => Brand)
  createBrand(@Args('createBrandInput') createBrandInput: CreateBrandInput) {
    return this.brandsService.create(createBrandInput);
  }

  @Query(() => [Brand], { name: 'brands' })
  findAll(
    @Args('limit', {type: ()=>Number}) limit:number,
    @Args('offset', {type: ()=>Number}) offset:number
  ) {
    return this.brandsService.findAll(limit, offset);
  }

  // @Query(() => Brand, { name: 'brand' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.brandsService.findOne(id);
  // }

  // @Mutation(() => Brand)
  // updateBrand(@Args('updateBrandInput') updateBrandInput: UpdateBrandInput) {
  //   return this.brandsService.update(updateBrandInput.id, updateBrandInput);
  // }

  // @Mutation(() => Brand)
  // removeBrand(@Args('id', { type: () => Int }) id: number) {
  //   return this.brandsService.remove(id);
  // }
}
