import { Injectable } from '@nestjs/common';
import { CreateSliderInput } from './dto/create-slider.input';
import { UpdateSliderInput } from './dto/update-slider.input';

@Injectable()
export class SlidersService {
  create(createSliderInput: CreateSliderInput) {
    return 'This action adds a new slider';
  }

  findAll() {
    return `This action returns all sliders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} slider`;
  }

  update(id: number, updateSliderInput: UpdateSliderInput) {
    return `This action updates a #${id} slider`;
  }

  remove(id: number) {
    return `This action removes a #${id} slider`;
  }
}
