import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { GetProductDto } from '../dto/get-products.dto';
import { ProductResponse } from '../dto/product-responose.dto';
import { UpdateProductGlobalOrderNoInput } from '../dto/updateGlobalOrderNo.input';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return await this.productsService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'get_products' })
  findAll(
    @Args('getProductInput') getProductInputDto:GetProductDto
  ) {
    return this.productsService.findAll(getProductInputDto);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('productId', { type: () => String }) id: string) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('updateProductInput') updateProductInput: UpdateProductInput) {
    return this.productsService.update(updateProductInput.id, updateProductInput);
  }

  @Mutation(() => String)
  async updateProductOrderNo(@Args('updateProductOrderNoInput') updateProductOrderNoInput: UpdateProductGlobalOrderNoInput) {
    return this.productsService.updateProductGlobalOrderNo(updateProductOrderNoInput);
  }

  @Mutation(()=>String, {name: 'deleteProduct'})
  async deleteProduct(
    @Args('productId') productId:string
  ){
    return await this.productsService.remove(productId)
  }
}
