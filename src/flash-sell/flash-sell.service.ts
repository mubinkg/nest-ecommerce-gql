import { Injectable } from '@nestjs/common';
import { CreateFlashSellInput } from './dto/create-flash-sell.input';
import { UpdateFlashSellInput } from './dto/update-flash-sell.input';

@Injectable()
export class FlashSellService {
  create(createFlashSellInput: CreateFlashSellInput) {
    return 'This action adds a new flashSell';
  }

  findAll() {
    return `This action returns all flashSell`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flashSell`;
  }

  update(id: number, updateFlashSellInput: UpdateFlashSellInput) {
    return `This action updates a #${id} flashSell`;
  }

  remove(id: number) {
    return `This action removes a #${id} flashSell`;
  }
}
