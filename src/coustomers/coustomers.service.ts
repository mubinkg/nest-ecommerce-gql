import { Injectable } from '@nestjs/common';
import { CreateCoustomerInput } from './dto/create-coustomer.input';
import { UpdateCoustomerInput } from './dto/update-coustomer.input';

@Injectable()
export class CoustomersService {
  create(createCoustomerInput: CreateCoustomerInput) {
    return 'This action adds a new coustomer';
  }

  findAll() {
    return `This action returns all coustomers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coustomer`;
  }

  update(id: number, updateCoustomerInput: UpdateCoustomerInput) {
    return `This action updates a #${id} coustomer`;
  }

  remove(id: number) {
    return `This action removes a #${id} coustomer`;
  }
}
