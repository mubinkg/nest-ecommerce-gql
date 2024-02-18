import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocuemnt } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private readonly categoryModel:Model<CategoryDocuemnt>
  ){}

  async create(createCategoryInput: CreateCategoryInput) {
    try{
      return await this.categoryModel.create(createCategoryInput)
    }
    catch(err){
      throw new NotImplementedException('Can not create category.')
    }
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
