import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductFaqService } from './product-faq.service';
import { ProductFaq } from './entities/product-faq.entity';
import { CreateProductFaqInput } from './dto/create-product-faq.input';
import { UpdateProductFaqInput } from './dto/update-product-faq.input';

@Resolver(() => ProductFaq)
export class ProductFaqResolver {
  constructor(private readonly productFaqService: ProductFaqService) {}

  @Mutation(() => ProductFaq)
  createProductFaq(@Args('createProductFaqInput') createProductFaqInput: CreateProductFaqInput) {
    return this.productFaqService.create(createProductFaqInput);
  }

  @Query(() => [ProductFaq], { name: 'productFaq' })
  findAll() {
    return this.productFaqService.findAll();
  }

  @Query(() => ProductFaq, { name: 'productFaq' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productFaqService.findOne(id);
  }

  @Mutation(() => ProductFaq)
  updateProductFaq(@Args('updateProductFaqInput') updateProductFaqInput: UpdateProductFaqInput) {
    return this.productFaqService.update(updateProductFaqInput.id, updateProductFaqInput);
  }

  @Mutation(() => ProductFaq)
  removeProductFaq(@Args('id', { type: () => Int }) id: number) {
    return this.productFaqService.remove(id);
  }
}
