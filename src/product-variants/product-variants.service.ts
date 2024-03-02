import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { CreateProductVariantInput } from './dto/create-product-variant.input';
import { UpdateProductVariantInput } from './dto/update-product-variant.input';
import { InjectModel } from '@nestjs/mongoose';
import { ProductVariant } from './entities/product-variant.entity';
import { Model } from 'mongoose';
import { CreateOrderInput } from 'src/orders/dto/create-order.input';
import { StockStatus } from './enum';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectModel(ProductVariant.name) private readonly productVariantModel:Model<ProductVariant>,
  ){}
  async create(createProductVariantInput: CreateProductVariantInput[]) {
    try {
      return await this.productVariantModel.insertMany(createProductVariantInput)
    } catch (error) {
      throw new InternalServerErrorException("Error on creating Product Variant")
    }
  }

  findAll() {
    return `This action returns all productVariants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productVariant`;
  }

  async update(id: string, productId: string) {
    
    try {
      const res = await this.productVariantModel.findByIdAndUpdate(id, { productId: productId }, { new: true });
    } catch (error) {
    }
  }

  remove(id: number) {
    return `This action removes a #${id} productVariant`;
  }

  async updateProductVarientAfterOrder(createOrderInput:CreateOrderInput){
    try{
      const {product_variant_id, quantity} = createOrderInput
      const variants = await this.productVariantModel.find({
        _id:{
          $in:product_variant_id
        }
      })
      const update = []

      product_variant_id.forEach((id, i)=>{
        const variant = variants.find((v)=>v._id.toString() === id)
        const qty = quantity[i]
        
        const updateBody = {
          totalStock: variant.totalStock-qty
        }
        if(variant.totalStock - qty < 0){
          throw new NotAcceptableException('Product out of stock')
        }
        if(variant.totalStock - qty === 0){
          updateBody['stockStatus'] = StockStatus.OUT_OF_STOCK
        }

        update.push({
          updateOne: {
            filter:{
              _id: id
            },
            update: updateBody
          }
        })

      })

      await this.productVariantModel.bulkWrite(update)
    }
    catch(err){
      throw err
    }
  }
}
