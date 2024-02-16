import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';
import { InjectModel } from '@nestjs/mongoose';
import { Area, AreaDocument } from './entities/area.entity';
import { Model } from 'mongoose';

@Injectable()
export class AreasService {

  constructor(
    @InjectModel(Area.name) private readonly areaModel:Model<AreaDocument>
  ){}

  async create(createAreaInput: CreateAreaInput) {
    try{
      const area = await this.areaModel.create(createAreaInput)
      return area
    }
    catch(err){
      throw new NotImplementedException('Can not crate area.')
    }
  }

  findAll() {
    return `This action returns all areas`;
  }

  async findOne(city_id: String) {
    try{
      const areasByCity = await this.areaModel.find({city_id: city_id})
      return areasByCity
    }catch(err){
      throw new NotFoundException('Not found area by this city id.')
    }
  }

  update(id: number, updateAreaInput: UpdateAreaInput) {
    return `This action updates a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
