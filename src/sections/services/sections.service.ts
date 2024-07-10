import { Injectable } from '@nestjs/common';
import { CreateSectionInput } from '../dto/create-section.input';
import { UpdateSectionInput } from '../dto/update-section.input';
import { InjectModel } from '@nestjs/mongoose';
import { Section, SectionDocuement } from '../entities/section.entity';
import { Model } from 'mongoose';
import { GetSectionsInput } from '../dto/get-sections.input';
import { getSectionQuery } from '../mongo';
import { FavoriteProductService } from 'src/favourites/services/favorite.product.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class SectionsService {

  constructor(
    private readonly favoriteProductService:FavoriteProductService,
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

  async findAll(getSectionInput:GetSectionsInput, user:any) {
    try{
      let sections = await this.sectionModel.aggregate(getSectionQuery(getSectionInput))
      const favoriteProductList = await this.favoriteProductService.getFavoriteProductList(user.userId)
      sections = sections.map((sectionItem:Section)=>{
        sectionItem.products = sectionItem.products.map((product:Product)=>{
          product.is_favorite = favoriteProductList.find((favorite:any)=>favorite == product._id.toString()) ? true : false;
          return product
        })
        return sectionItem
      })
      return sections;
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
