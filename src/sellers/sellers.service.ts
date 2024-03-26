import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateSellerInput } from './dto/create-seller.input';
import { UpdateSellerInput } from './dto/update-seller.input';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';
import { InjectModel } from '@nestjs/mongoose';
import { Seller, SellerDocument } from './entities/seller.entity';
import { Model } from 'mongoose';

@Injectable()
export class SellersService {

  constructor(
    @InjectModel(Seller.name) private readonly sellerModel:Model<SellerDocument>
  ){}

  async create(createSellerInput: CreateSellerInput) {
    try{

      const isExist = await this.sellerModel.exists({mobile: createSellerInput.mobile, email: createSellerInput.email})

      if(isExist) {
        throw new NotAcceptableException('Duplicate email or phone')
      }

      createSellerInput.national_identity_card = await uploadFile(createSellerInput.national_identity_card as FileUpload) as string
      createSellerInput.address_proof = await uploadFile(createSellerInput.address_proof as FileUpload) as string
      createSellerInput.business_license = await uploadFile(createSellerInput.business_license as FileUpload) as string

      return await this.sellerModel.create(createSellerInput)
    }
    catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all sellers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  update(id: number, updateSellerInput: UpdateSellerInput) {
    return `This action updates a #${id} seller`;
  }

  remove(id: number) {
    return `This action removes a #${id} seller`;
  }
}
