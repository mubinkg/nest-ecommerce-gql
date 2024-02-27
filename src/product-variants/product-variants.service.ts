import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductVariantInput } from './dto/create-product-variant.input';
import { UpdateProductVariantInput } from './dto/update-product-variant.input';
import { InjectModel } from '@nestjs/mongoose';
import { ProductVariant } from './entities/product-variant.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductVariantsService {
  constructor(@InjectModel(ProductVariant.name) private readonly productVariantModel:Model<ProductVariant>){}
  async create(createProductVariantInput: CreateProductVariantInput) {
    console.log(createProductVariantInput)
    try {
      return await this.productVariantModel.create(createProductVariantInput)
      
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
}
