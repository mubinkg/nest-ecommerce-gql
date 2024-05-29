import { Injectable } from '@nestjs/common';
import { CreateSectionInput } from '../dto/create-section.input';
import { UpdateSectionInput } from '../dto/update-section.input';
import { InjectModel } from '@nestjs/mongoose';
import { Section, SectionDocuement } from '../entities/section.entity';
import { Model } from 'mongoose';
import { GetSectionsInput } from '../dto/get-sections.input';
import { getSectionQuery } from '../mongo';

@Injectable()
export class SectionsService {

  constructor(
    @InjectModel(Section.name) private readonly sectionModel:Model<SectionDocuement>
  ){}

  async create(createSectionInput: CreateSectionInput) {
    try{
      const total = await this.sectionModel.countDocuments() + 1;
      return await this.sectionModel.create({...createSectionInput, order: total})
    }
    catch(err){
      throw err;
    }
  }

  async findAll(getSectionInput:GetSectionsInput) {
    try{
      return await this.sectionModel.aggregate(getSectionQuery(getSectionInput))
    }
    catch(err){
      throw err;
    }
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
