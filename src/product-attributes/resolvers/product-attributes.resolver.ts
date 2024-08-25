import { Resolver, Query, Mutation, Args, Int, Field } from '@nestjs/graphql';
import { ProductAttributesService } from '../service/product-attributes.service';
import { ProductAttribute } from '../entities/product-attribute.entity';
import { CreateProductAttributeInput } from '../dto/create-product-attribute.input';
import { UpdateProductAttributeInput } from '../dto/update-product-attribute.input';
import { ProductAttributeSetService } from '../service/product-attribute-set.service';
import { ProductAttributeSet } from '../entities/product-attribute-set.entity';
import { CreateProductAttributeSetInput } from '../dto/create-product-attribute-set.input';
import { GetProductAttributeSet } from '../dto/get-attributeset.dto';
import { ProductAttributeResponseDto } from '../dto/product-attribute-response.dto';
import { AdminProductAttributeValuesResponse } from '../dto/admin-product-atrribute-values';
import { AttributeSetValuesDto } from '../dto/attribute-set-values.dto';

@Resolver(() => ProductAttribute)
export class ProductAttributesResolver {
  constructor(
              private readonly productAttributesService: ProductAttributesService,
              private readonly productAttributeSetService:ProductAttributeSetService
    ) {}

  @Mutation(() => ProductAttribute)
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

  // @Query(() => ProductAttribute, { name: 'productAttribute' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.productAttributesService.findOne(id);
  // }

  // @Mutation(() => ProductAttribute)
  // updateProductAttribute(@Args('updateProductAttributeInput') updateProductAttributeInput: UpdateProductAttributeInput) {
  //   return this.productAttributesService.update(updateProductAttributeInput.id, updateProductAttributeInput);
  // }

  // @Mutation(() => ProductAttribute)
  // removeProductAttribute(@Args('id', { type: () => Int }) id: number) {
  //   return this.productAttributesService.remove(id);
  // }

  @Query(()=>AdminProductAttributeValuesResponse)
  attributeValues(
    @Args('limit', {type: ()=>Number}) limit: number,
    @Args('offset', {type: ()=>Number}) offset: number,
    @Args('query', {type: ()=>String,nullable:true}) query: string
  ){
    return this.productAttributesService.productAttributeValues(limit, offset)
  }

  @Query(()=>[ProductAttribute],{nullable:true})
  getAllProductAttribute(){
    return this.productAttributesService.getAll()
  }
  

  @Query(()=>AttributeSetValuesDto)
  getAttributeValuesByAttributeSet(){

  }
}
