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

  async validatePromoCode(promoCode:string,orderFinalAmount:number,userId:string){

    const currentDate= new Date()

    const promoCodeDetails=await this.promoCodeModel.findOne({promoCode,status:ActiveStatus.ACTIVE,startDate:{$lte:currentDate},endDate:{$gte:currentDate}})

    if(!promoCodeDetails){
      throw new NotFoundException('Promo Code is Invalid')
    }

    if(promoCodeDetails?.numberOfUsers<=promoCodeDetails?.numberOfUsedUser){
      throw new NotAcceptableException('Invalid promocode')
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

   const usedUsers=promoCodeDetails?.usedUsers

   if(promoCodeDetails?.repeatUsage!==RepeatUsage.ALLOWED && promoCodeDetails.numberOfUsedUser>0){
    const isUsed= usedUsers.includes(userId)

    if(isUsed){
      throw new NotAcceptableException('Already used this promocode')
    }
    
   }

    return promoCodeDetails

  }

  async getPromoCodes(){
    
  }

 
}
