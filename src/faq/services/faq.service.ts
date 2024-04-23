import { Injectable } from '@nestjs/common';
import { CreateFaqInput, FaqDocument } from '../dto/create-faq.input';
import { UpdateFaqInput } from '../dto/update-faq.input';
import { InjectModel } from '@nestjs/mongoose';
import { Faq } from '../entities/faq.entity';
import { Model } from 'mongoose';
import { GetFaqInput } from '../dto/get-faq-input';

@Injectable()
export class FaqService {

  constructor(
    @InjectModel(Faq.name) private readonly faqModel:Model<FaqDocument>
  ){}

  async create(createFaqInput: CreateFaqInput, user:any) {
    console.log(user)
    try{
      return await this.faqModel.create({...createFaqInput, user: user.userId})
    }
    catch(err){
      throw err;
    }
  }

  async findAll(getFaqInput:GetFaqInput) {
    try{
      const order = getFaqInput?.order === 'ASC'? 1 : -1
      return await this.faqModel.find({}).sort({_di: order}).limit(getFaqInput.limit).skip(getFaqInput.offset)
    }
    catch(err){
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} faq`;
  }

  update(id: number, updateFaqInput: UpdateFaqInput) {
    return `This action updates a #${id} faq`;
  }

  remove(id: number) {
    return `This action removes a #${id} faq`;
  }
}
