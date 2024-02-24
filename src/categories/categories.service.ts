import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocuemnt } from './entities/category.entity';
import { Model } from 'mongoose';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name) private readonly categoryModel:Model<CategoryDocuemnt>
  ){}

  async create(createCategoryInput: CreateCategoryInput) {

    try{
      if(createCategoryInput.image){
        createCategoryInput.image = await uploadFile(createCategoryInput.image as FileUpload) as string
      }
      if(createCategoryInput.banner){
        createCategoryInput.banner = await uploadFile(createCategoryInput.banner as FileUpload) as string
      }
      const totalCategory = await this.categoryModel.countDocuments()
      return await this.categoryModel.create({...createCategoryInput, order: totalCategory+1})
    }
    catch(err){
      console.log(err)
      throw new NotImplementedException('Can not create category.')
    }
  }

  async getCategories() {
    try {
      return await this.categoryModel.aggregate([
        {
          $match: {
            status: "active",
            parent: {
              $eq: null,
            },
          },
        },
        {
          $lookup:
            {
              from: "categories",
              localField: "_id",
              foreignField: "parent",
              as: "children",
            },
        },
      ]);
      
    } catch (error) {
      throw new InternalServerErrorException("Error On finding categories ",error.message)
      
    }
   
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
