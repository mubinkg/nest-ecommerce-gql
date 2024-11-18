import { Injectable } from '@nestjs/common';
import { CreateOfferInput } from '../dto/create-offer.input';
import { UpdateOfferInput } from '../dto/update-offer.input';
import { InjectModel } from '@nestjs/mongoose';
import { Offer, OfferType } from '../entities/offer.entity';
import { Model } from 'mongoose';

@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name) private readonly offerModel:Model<OfferType>
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

  findAll() {
    return `This action returns all offers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferInput: UpdateOfferInput) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
