import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttribute } from './entities/product-attribute.entity';
import { CreateProductAttributeInput } from './dto/create-product-attribute.input';
import { UpdateProductAttributeInput } from './dto/update-product-attribute.input';
import { ProductAttributeSetService } from './product-attribute-set.service';
import { ProductAttributeSet } from './entities/product-attribute-set.entity';
import { CreateProductAttributeSetInput } from './dto/create-product-attribute-set.input';
import { GetProductAttributeSet } from './dto/get-attributeset.dto';
import { ProductAttributeResponseDto } from './dto/product-attribute-response.dto';

@Resolver(() => ProductAttribute)
export class ProductAttributesResolver {
  constructor(
              private readonly productAttributesService: ProductAttributesService,
              private readonly productAttributeSetService:ProductAttributeSetService
    ) {}

  @Mutation(() => [ProductAttribute])
  async createProductAttribute(@Args('createProductAttributeInput') createProductAttributeInput: CreateProductAttributeInput) {
    return await this.productAttributesService.createProductAttribute(createProductAttributeInput);
  }

  @Mutation(() => ProductAttributeSet)
  async createProductAttributeSet(@Args('createProductAttributeInput') createProductAttributeSetInput: CreateProductAttributeSetInput) {
    return await this.productAttributeSetService.createProductAttributeSet(createProductAttributeSetInput);
  }

  @Query(()=>GetProductAttributeSet, {nullable:true})
  async getProductAttributeSetList(
    @Args('limit', {type: ()=>Number}) limit: number,
    @Args('offset', {type: ()=>Number}) offset: number,
    @Args('query', {type: ()=>String,nullable:true}) query: string
  ){
    return this.productAttributeSetService.getProductAttributeSetList(limit, offset, query)
  }

  @Query(() => ProductAttributeResponseDto, { name: 'productAttributes' })
  findAll(
    @Args('limit', {type: ()=>Number}) limit: number,
    @Args('offset', {type: ()=>Number}) offset: number,
    @Args('query', {type: ()=>String,nullable:true}) query: string
  ) {
    return this.productAttributesService.findAll(limit, offset, query);
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
