import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateSliderInput } from '../dto/create-slider.input';
import { UpdateSliderInput } from '../dto/update-slider.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SliderType, SliderTypeDocument } from '../entities/slider-type.entity';
import { Slider, SliderDocument } from '../entities/slider.entity';
import { CreateSliderTypeInput } from '../dto/create-slider-type.input';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class SlidersService {

  constructor(
    @InjectModel(Slider.name) private readonly sliderModel:Model<SliderDocument>,
    @InjectModel(SliderType.name) private readonly sliderTypeModel:Model<SliderTypeDocument>
  ){}

  async create(createSliderInput: CreateSliderInput) {
    try{
      const data = await uploadFile(createSliderInput.image as FileUpload)
      createSliderInput.image = data as string
      return await this.sliderModel.create(createSliderInput)
    }
    catch(err){
      console.log(err)
      throw new NotImplementedException('Can not create slidder')
    }
  }

  async createSliderType(createSliderTypeInput:CreateSliderTypeInput){
    try{
      return await this.sliderTypeModel.create(createSliderTypeInput)
    }
    catch(err){
      throw new NotImplementedException('Can not create slider type.')
    }
  }

  async findAll(limit:number, offset: number) {
    try{
      return await this.sliderModel.find().populate('slider_type').limit(limit).skip(offset)
    }
    catch(err){
      throw new NotFoundException('Slider not found')
    }
  }

  async getSliderTypeList(limit:number, offset:number):Promise<SliderType[]>{
    try{
      return await this.sliderTypeModel.find({}).limit(limit).skip(offset)
    }
    catch(err){
      throw err
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} slider`;
  }

  update(id: number, updateSliderInput: UpdateSliderInput) {
    return `This action updates a #${id} slider`;
  }

  remove(id: number) {
    return `This action removes a #${id} slider`;
  }
}
