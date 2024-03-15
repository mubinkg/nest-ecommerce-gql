import { Injectable } from '@nestjs/common';
import { CreateAramicInput } from './dto/create-aramic.input';
import { UpdateAramicInput } from './dto/update-aramic.input';

@Injectable()
export class AramicsService {
  create(createAramicInput: CreateAramicInput) {
    return 'This action adds a new aramic';
  }

  findAll() {
    return `This action returns all aramics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} aramic`;
  }

  update(id: number, updateAramicInput: UpdateAramicInput) {
    return `This action updates a #${id} aramic`;
  }

  remove(id: number) {
    return `This action removes a #${id} aramic`;
  }
}
