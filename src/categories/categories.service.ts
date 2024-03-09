import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocuemnt } from './entities/category.entity';
import mongoose, { Model, Mongoose } from 'mongoose';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';
import { GetCategoryDto } from './entities/get-category.dto';

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

  async getCategories(getCategoriesInput: GetCategoryDto) {
    try {
      const query  =[]
      const matchData = {
        status: "active",
        parent: {
          $eq: null,
        },
      }

      const match = {
        $match: matchData
      }

      const lookup = {
        $lookup:
          {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
      }

      const skip = {}

      const limit = {}

      query.push(match)
      query.push(lookup)

      if(getCategoriesInput?.id){
        match['_id'] = new mongoose.Types.ObjectId(getCategoriesInput.id) 
      }
      if(getCategoriesInput?.limit){
        limit['$limit'] = getCategoriesInput.limit
        query.push(limit)
      }
      if(getCategoriesInput.offset){
        skip['$skip'] = getCategoriesInput.offset
        query.push(skip)
      }
      const sort = {
        $sort: {
          _id: -1
        }
      }
      query.push(sort)
      return await this.categoryModel.aggregate(query)
      
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
