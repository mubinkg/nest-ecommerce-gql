import { Injectable, Logger } from '@nestjs/common';
import { CreateHotDealInput } from '../dto/create-hot-deal.input';
import { UpdateHotDealInput } from '../dto/update-hot-deal.input';
import { InjectModel } from '@nestjs/mongoose';
import { HotDeal, HotDealDocuement } from '../entities/hot-deal.entity';
import { Model } from 'mongoose';

@Injectable()
export class HotDealsService {
  private readonly logger = new Logger(HotDealsService.name)
  constructor(
    @InjectModel(HotDeal.name)
    private readonly hotDealModel:Model<HotDealDocuement>,
  ){}
  async create(createHotDealInput: CreateHotDealInput) {
    try{
      this.logger.log('Start hot deals create service')
      const hotDeals = createHotDealInput.products.map((d:string)=>({product: d, validTime: createHotDealInput.validTime, discountPercent: createHotDealInput.discountPercent}))
      this.logger.log('Hot deals input crated successfully')
      await this.hotDealModel.insertMany(hotDeals)
      this.logger.log('Hot deals inserted at db successfull')
      return "Hot deals created successfully."
    }
    catch(err){
      this.logger.error('Erro on creating hot deals ', err)
      throw err;
    }
  }

  findAll() {
    return `This action returns all hotDeals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hotDeal`;
  }

  update(id: number, updateHotDealInput: UpdateHotDealInput) {
    return `This action updates a #${id} hotDeal`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotDeal`;
  }
}
