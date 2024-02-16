import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './entities/city.entity';
import { Model } from 'mongoose';

@Injectable()
export class CitiesService {

  constructor(
    @InjectModel(City.name) private readonly cityModel:Model<CityDocument>
  ){}

  async create(createCityInput: CreateCityInput) {
    try{
      const city = await this.cityModel.create(createCityInput)
      return city
    }
    catch(err){
      throw new NotImplementedException('Can not create city.')
    } 
  }

  async findAll(limit:number, offset:number, query:string) {
    try{
      const cities = await this.cityModel.find({
        city_name: {
          $regex: query,
          $options: 'i'
        }
      }).limit(limit).skip(offset)
      return cities
    }
    catch(err){
      throw new NotFoundException('City Not Found')
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityInput: UpdateCityInput) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
