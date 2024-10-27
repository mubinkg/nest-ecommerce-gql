import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from '../services/products.service';
import { Product } from '../entities/product.entity';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { GetProductDto } from '../dto/get-products.dto';
import { ProductResponse } from '../dto/product-responose.dto';
import { UpdateProductGlobalOrderNoInput } from '../dto/updateGlobalOrderNo.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @UseGuards(GqlAuthGuard)
  async createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return await this.productsService.create(createProductInput);
  }

  @Mutation(() => String)
  async createBulkProduct() {
    return await this.productsService.createBulkProduct();
  }

  @Query(() => [Product], { name: 'get_products' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('getProductInput') getProductInputDto:GetProductDto,
    @CurrentUser('user') user:any
  ) {
    return this.productsService.findAll(getProductInputDto, user);
  }

  @Query(() => [Product], { name: 'getProductsForWeb' })
  findAllFroWeb(
    @Args('getProductInput') getProductInputDto:GetProductDto,
  ) {
    return this.productsService.getProductForWeb(getProductInputDto);
  }

  @Query(() => [Product])
  getProductForWeb(
    @Args('getProductInput') getProductInputDto:GetProductDto,
  ) {
    return this.productsService.getProductForWeb(getProductInputDto);
  }

  @Query(() => Product, { name: 'product' })
  @UseGuards(GqlAuthGuard)
  findOne(
    @Args('productId', { type: () => String }) id: string,
    @CurrentUser('user') user:{userId:string}
  ) {
    return this.productsService.findOne(id, user);
  }

  @Query(() => Product)
  productForWeb(
    @Args('productId', { type: () => String }) id: string,
  ) {
    return this.productsService.productForWeb(id);
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
