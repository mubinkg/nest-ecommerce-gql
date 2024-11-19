import { Injectable } from '@nestjs/common';
import { CreateOfferInput } from '../dto/create-offer.input';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { InjectModel } from '@nestjs/mongoose';
import { Offer, OfferDocument } from '../entities/offer.entity';
import { Model } from 'mongoose';
import { OfferType } from '../enum';
import { Product, ProductDocument } from 'src/products/entities/product.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private readonly offerModel:Model<OfferDocument>,
    @InjectModel(Product.name) private readonly productModel:Model<ProductDocument>
  ){}
  async create(createOfferInput: CreateOfferInput) {
    try{
      const offer = await this.offerModel.create(createOfferInput)
      return offer;
    }
    catch(err){
      throw err;
    }
  }

  async findAll(limit:number, offset:number) {
    try{
      const offers = await this.offerModel.find({}).limit(limit).skip(offset)
      return offers
    }
    catch(err){
      throw err;
    }
  }

  async findOne(id: string) {
    try{
      const offer = await this.offerModel.findById(id)
      if(offer.type === OfferType.CUSTOM){
        const productIds = offer.products
        const products = await this.productModel.find({_id: {$in:productIds}})
        offer.products = products
      }
    }
    catch(err){
      throw err;
    }
  }

  update(id: number, updateOfferInput: UpdateOfferInput) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
