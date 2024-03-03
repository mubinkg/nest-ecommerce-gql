import { Injectable } from '@nestjs/common';
import { CreateProductFaqInput } from './dto/create-product-faq.input';
import { UpdateProductFaqInput } from './dto/update-product-faq.input';

@Injectable()
export class ProductFaqService {
  create(createProductFaqInput: CreateProductFaqInput) {
    return 'This action adds a new productFaq';
  }

  findAll() {
    return `This action returns all productFaq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productFaq`;
  }

  update(id: number, updateProductFaqInput: UpdateProductFaqInput) {
    return `This action updates a #${id} productFaq`;
  }

  remove(id: number) {
    return `This action removes a #${id} productFaq`;
  }
}
