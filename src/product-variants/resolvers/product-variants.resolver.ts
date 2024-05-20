import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductVariantsService } from '../services/product-variants.service';
import { ProductVariant } from '../entities/product-variant.entity';
import { AmdinProductVariantResponse } from '../dto/admin-product-variant.dto';

@Resolver(() => ProductVariant)
export class ProductVariantsResolver {
  constructor(private readonly productVariantsService: ProductVariantsService) {}

  // @Mutation(() => ProductVariant)
  // createProductVariant(@Args('createProductVariantInput') createProductVariantInput: CreateProductVariantInput) {
  //   return this.productVariantsService.create(createProductVariantInput);
  // }

  @Query(() => AmdinProductVariantResponse, { name: 'productVariants' })
  findAll(
    @Args('limit', {type: ()=>Number}) limit: number,
    @Args('offset', {type: ()=>Number}) offset: number,
    @Args('query', {type: ()=>String,nullable:true}) query: string
  ) {
    return this.productVariantsService.findAll(limit,offset);
  }

  @Query(() => ProductVariant, { name: 'productVariant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productVariantsService.findOne(id);
  }

  

  @Mutation(() => ProductVariant)
  removeProductVariant(@Args('id', { type: () => Int }) id: number) {
    return this.productVariantsService.remove(id);
  }
}
