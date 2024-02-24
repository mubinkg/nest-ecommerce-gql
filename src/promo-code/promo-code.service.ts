import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreatePromoCodeInput } from './dto/create-promo-code.input';
import { UpdatePromoCodeInput } from './dto/update-promo-code.input';
import { InjectModel } from '@nestjs/mongoose';
import { PromoCode, PromoCodeDocument } from './entities/promo-code.entity';
import mongoose, { Model } from 'mongoose';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';
import { ActiveStatus } from './types/activeStatus.enum';
import { RepeatUsage } from './types/repeatUsage.enum';

@Injectable()
export class PromoCodeService {
  constructor(
    @InjectModel(PromoCode.name) private promoCodeModel:Model<PromoCodeDocument>
  ){}

  async createPromoCode(createPromoCodeInput: CreatePromoCodeInput) {

    let promoCode

    try {
      if(createPromoCodeInput.image){
        createPromoCodeInput.image = await uploadFile(createPromoCodeInput.image as FileUpload) as string
      }
  
      promoCode=await this.promoCodeModel.create(createPromoCodeInput)
      
    } catch (error) {
      throw new InternalServerErrorException('Failed to create Promocode'+error.message)
    }

    return promoCode;
  }

  async validatePromoCode(promoCode:string,orderFinalAmount:number){

    const currentDate= new Date()

    const promoCodeDetails=await this.promoCodeModel.findOne({promoCode,status:ActiveStatus.ACTIVE,startDate:{$lte:currentDate},endDate:{$gte:currentDate}})

    if(!promoCodeDetails){
      throw new NotFoundException('Promo Code is Invalid')
    }

    const minOrderAmount=Number(promoCodeDetails?.minOrderAmount)
    const maxOrderAmount=Number(promoCodeDetails?.maxOrderAmount)

   if(orderFinalAmount!<minOrderAmount)
   {
    throw new NotAcceptableException(`Order amount should be greater than ${minOrderAmount}`)
   }

   if(orderFinalAmount!>maxOrderAmount)
   {
    throw new NotAcceptableException(`Order amount should be less than ${maxOrderAmount}`)
   }

   const usedUsers=promoCodeDetails.usedUsers

  //  if(promoCodeDetails?.repeatUsage!==RepeatUsage.ALLOWED){

    

  //  }


  //   console.log(promoCodeDetails)


    return promoCodeDetails

  }

  findAll() {
    return `This action returns all promoCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promoCode`;
  }

  update(id: number, updatePromoCodeInput: UpdatePromoCodeInput) {
    return `This action updates a #${id} promoCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} promoCode`;
  }
}
