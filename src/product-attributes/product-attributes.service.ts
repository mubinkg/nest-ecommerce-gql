import { Injectable } from '@nestjs/common';
import { CreateProductAttributeInput } from './dto/create-product-attribute.input';
import { UpdateProductAttributeInput } from './dto/update-product-attribute.input';

@Injectable()
export class ProductAttributesService {
  create(createProductAttributeInput: CreateProductAttributeInput) {
    return 'This action adds a new productAttribute';
  }

  findAll() {
    return `This action returns all productAttributes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productAttribute`;
  }

  update(id: number, updateProductAttributeInput: UpdateProductAttributeInput) {
    return `This action updates a #${id} productAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} productAttribute`;
  }
}
