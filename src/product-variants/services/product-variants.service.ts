import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateProductVariantInput } from '../dto/create-product-variant.input';
import { UpdateProductVariantInput } from '../dto/update-product-variant.input';
import { InjectModel } from '@nestjs/mongoose';
import { ProductVariant } from '../entities/product-variant.entity';
import { Model } from 'mongoose';
import { CreateOrderInput } from 'src/orders/dto/create-order.input';
import { StockStatus } from '../enum';

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

  async findAll(limit:number, offset:number) {
    const productVariants = await this.productVariantModel.aggregate([
      {
        $lookup: {
          from: "productattributes",
          localField: "attributeReference",
          foreignField: "_id",
          as: "attributes",
          pipeline: [
            {
              $project: {
                _id: 1,
                values: 1,
              },
            },
          ],
        },
      },
      {
        $sort:{
          _id: -1
        }
      },
      {
        $limit: limit
      },
      {
        $skip: offset
      }
    ])
    const count = await this.productVariantModel.countDocuments({})
    return {
      productVariants,
      count
    }
  }

  async findOne(values: string[]) {
    try{
      let variant = await this.productVariantModel.findOne({
        attributeValues: values
      })
      if(!variant && values.length === 2){
        values = [values[1],values[0]]
        variant = await this.productVariantModel.findOne({
          attributeValues: values
        })
      }
      if(!variant || values.length<=1){
        throw new NotFoundException('Product variants not found')
      }
      return variant
    }
    catch(err){
      throw err;
    }
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
      const {product_variants, quantity} = createOrderInput
      const variants = await this.productVariantModel.find({
        _id:{
          $in:product_variants
        }
      })
      const update = []

      product_variants.forEach((id, i)=>{
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

  async updateProductVariant(updateProductVariantInput:UpdateProductVariantInput){
    try{
      const quantity = updateProductVariantInput.type === 'add' ? updateProductVariantInput.quantity : -updateProductVariantInput.quantity
      const productVariant = await this.productVariantModel.findById(updateProductVariantInput.id)
      productVariant.totalStock = productVariant.totalStock + quantity
      const updatedData = await productVariant.save()
      return updatedData
    }
    catch(err){
      throw err;
    }
  }
}
