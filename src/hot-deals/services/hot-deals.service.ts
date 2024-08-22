import { Injectable } from '@nestjs/common';
import { CreateHotDealInput } from '../dto/create-hot-deal.input';
import { UpdateHotDealInput } from '../dto/update-hot-deal.input';

@Injectable()
export class HotDealsService {
  create(createHotDealInput: CreateHotDealInput) {
    return 'This action adds a new hotDeal';
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
