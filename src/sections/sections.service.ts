import { Injectable } from '@nestjs/common';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';
import { InjectModel } from '@nestjs/mongoose';
import { Section, SectionDocuement } from './entities/section.entity';
import { Model } from 'mongoose';

@Injectable()
export class SectionsService {

  constructor(
    @InjectModel(Section.name) private readonly sectionModel:Model<SectionDocuement>
  ){}

  async create(createSectionInput: CreateSectionInput) {
    try{
      return await this.sectionModel.create(createSectionInput)
    }
    catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all sections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} section`;
  }

  update(id: number, updateSectionInput: UpdateSectionInput) {
    return `This action updates a #${id} section`;
  }

  remove(id: number) {
    return `This action removes a #${id} section`;
  }
}
