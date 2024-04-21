import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../entities/category.entity';
import { CreateCategoryInput } from '../dto/create-category.input';
import { UpdateCategoryInput } from '../dto/update-category.input';
import { CategoriesResponse } from '../dto/categories.response.dto';
import { GetCategoryDto } from '../entities/get-category.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { AdminCategoryList } from '../dto/admin-category-list.dto';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [CategoriesResponse], { name: 'categories' })
  getCategories(
    @Args('getCategoriesInput') getCategoriesInput:GetCategoryDto
  ) {
    return this.categoriesService.getCategories(getCategoriesInput);
  }

  @Query(() => AdminCategoryList, { name: 'getAdminCategories' })
  getAdminCategories(
    @Args('getCategoriesInput') getCategoriesInput:GetCategoryDto
  ) {
    return this.categoriesService.getAdminCategories(getCategoriesInput);
  }




  // @Query(() => Category, { name: 'category' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.categoriesService.findOne(id);
  // }

  // @Mutation(() => Category)
  // updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput) {
  //   return this.categoriesService.update(updateCategoryInput.id, updateCategoryInput);
  // }

  // @Mutation(() => Category)
  // removeCategory(@Args('id', { type: () => Int }) id: number) {
  //   return this.categoriesService.remove(id);
  // }
}
