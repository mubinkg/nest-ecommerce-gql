import { Injectable } from '@nestjs/common';
import { CreateBrandInput } from '../dto/create-brand.input';
import { UpdateBrandInput } from '../dto/update-brand.input';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from '../entities/brand.entity';
import { Model } from 'mongoose';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class BrandsService {

  constructor(
    @InjectModel(Brand.name) private readonly brandModel:Model<BrandDocument>
  ){}

  async create(createBrandInput: CreateBrandInput) {
    try{
      return await this.brandModel.create(createBrandInput)
    }
    catch(err){
      throw err;
    }
  }

  async findAll(limit:number, offset:number) {
    try{
      const brands = await this.brandModel.find({}).sort('-_id').limit(limit).skip(offset)
      return brands
    }
    catch(err){
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandInput: UpdateBrandInput) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
