import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../entities/product.entity';
import mongoose, { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { ProductVariantsService } from '../../product-variants/services/product-variants.service';
import { GetProductDto } from '../dto/get-products.dto';
import { UpdateProductGlobalOrderNoInput } from '../dto/updateGlobalOrderNo.input';
import { ProductAttributeInput } from '../dto/product-attribute.input';
import { convertToObjectId } from 'src/utils/convert-to-objectid';
import { getProductsQuery, productDetailsQuery } from '../mongo';

@Injectable()
export class ProductsService {

  constructor(
    private productVariantsService: ProductVariantsService,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ) { }

  async create(createProductInput: CreateProductInput) {
    const { createProductVariantInput } = createProductInput
    
    try {
      createProductInput.attributes = createProductInput.attributes.map((d:ProductAttributeInput)=>({
        ...d,
        attribute: convertToObjectId(d.attribute),
        values: d.values.map((d:any)=>convertToObjectId(d))
      }))
      const productCount= await this.productModel.countDocuments()

      createProductInput.globalOrderNo=productCount+1

      const product = await this.productModel.create(createProductInput)
      
      const productVariant = await this.productVariantsService.create(createProductVariantInput.map((d) => ({ ...d, product: product._id })))
      
      return product
    
    } catch (err) {
      Logger.log(err)
      return new NotImplementedException('Can not create product' + err.message)
    }
  }

  async findAll(getProductInputDto: GetProductDto) {
    try{
      const productQuery = getProductsQuery(getProductInputDto)
      return await this.productModel.aggregate(productQuery)
    }
    catch(err){
      throw err;
    }
  }


  async updateProductGlobalOrderNo(updateProductGlobalOrderNoInput:UpdateProductGlobalOrderNoInput){

    const {productArray}=updateProductGlobalOrderNoInput

    let updateArrayInput=[],updatedProducts

    if(productArray.length===0){
      throw new NotAcceptableException(`Product array length cannot be zero`)
    }

    try {

      productArray.map((element)=>{
          updateArrayInput.push({ updateOne :
            {
               "filter": {_id:element._id},
               "update": {globalOrderNo:element.globalOrderNo},            // Changed in 4.2
            }
         })
      })

      updatedProducts= await this.productModel.bulkWrite(updateArrayInput)

      
    } catch (error) {
        throw new InternalServerErrorException('Failed to update product order no')
    }

    return "Successfully updated"

  }

  async findOne(id: string) {
    try{
      const data = await this.productModel.aggregate(productDetailsQuery(id))
      if(data?.length <= 0){
        throw new NotFoundException('Product not found')
      }
      return data[0]
    }
    catch(err){
      throw err;
    }
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    try{
      await this.productModel.findByIdAndDelete(id)
      return 'Deleted ' + id
    }
    catch(err){
      throw err
    }
  }
}
