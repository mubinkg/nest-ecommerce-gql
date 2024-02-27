import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductVariantInput } from './dto/create-product-variant.input';
import { UpdateProductVariantInput } from './dto/update-product-variant.input';

@Resolver(() => ProductVariant)
export class ProductVariantsResolver {
  constructor(private readonly productVariantsService: ProductVariantsService) {}

  @Mutation(() => ProductVariant)
  createProductVariant(@Args('createProductVariantInput') createProductVariantInput: CreateProductVariantInput) {
    return this.productVariantsService.create(createProductVariantInput);
  }

  @Query(() => [ProductVariant], { name: 'productVariants' })
  findAll() {
    return this.productVariantsService.findAll();
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
