import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttribute } from './entities/product-attribute.entity';
import { CreateProductAttributeInput } from './dto/create-product-attribute.input';
import { UpdateProductAttributeInput } from './dto/update-product-attribute.input';

@Resolver(() => ProductAttribute)
export class ProductAttributesResolver {
  constructor(private readonly productAttributesService: ProductAttributesService) {}

  @Mutation(() => ProductAttribute)
  createProductAttribute(@Args('createProductAttributeInput') createProductAttributeInput: CreateProductAttributeInput) {
    return this.productAttributesService.create(createProductAttributeInput);
  }

  @Query(() => [ProductAttribute], { name: 'productAttributes' })
  findAll() {
    return this.productAttributesService.findAll();
  }

  @Query(() => ProductAttribute, { name: 'productAttribute' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productAttributesService.findOne(id);
  }

  @Mutation(() => ProductAttribute)
  updateProductAttribute(@Args('updateProductAttributeInput') updateProductAttributeInput: UpdateProductAttributeInput) {
    return this.productAttributesService.update(updateProductAttributeInput.id, updateProductAttributeInput);
  }

  @Mutation(() => ProductAttribute)
  removeProductAttribute(@Args('id', { type: () => Int }) id: number) {
    return this.productAttributesService.remove(id);
  }
}
