import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductVariantsService } from '../services/product-variants.service';
import { ProductVariant } from '../entities/product-variant.entity';
import { AmdinProductVariantResponse } from '../dto/admin-product-variant.dto';
import { UpdateProductVariantInput } from '../dto/update-product-variant.input';

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
  findOne(@Args('values', { type: () => [String] }) values: string[]) {
    return this.productVariantsService.findOne(values);
  }

  @Mutation(() => ProductVariant)
  removeProductVariant(@Args('id', { type: () => Int }) id: number) {
    return this.productVariantsService.remove(id);
  }

  @Mutation(()=>ProductVariant)
  updateProductVariant(@Args('updateProductVariantInput') updateProductVariantInput: UpdateProductVariantInput){
    return this.productVariantsService.updateProductVariant(updateProductVariantInput)
  }
}
