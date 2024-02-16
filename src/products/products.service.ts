import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProductsService {

  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ){}

  async create(createProductInput: CreateProductInput) {
    try{
      const product = await this.productModel.create(createProductInput)
      return product
    }catch(err){
      Logger.log(err)
      return new NotImplementedException('Can not create product')
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
