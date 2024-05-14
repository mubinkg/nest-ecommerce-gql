import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductAttributeInput } from '../dto/create-product-attribute.input';
import { UpdateProductAttributeInput } from '../dto/update-product-attribute.input';
import { InjectModel } from '@nestjs/mongoose';
import { ProductAttribute, ProductAttributeDocument } from '../entities/product-attribute.entity';
import { Model } from 'mongoose';
import ShortUniqueId from 'short-unique-id';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';
import { ProductAttributeValue, ProductAttributeValueDocument } from '../entities/product-attribute-value.entity';
import { getAllAttribute } from '../query';

@Injectable()
export class ProductAttributesService {

  constructor(
    @InjectModel(ProductAttribute.name) private productAttributeModel: Model<ProductAttributeDocument>,
    @InjectModel(ProductAttributeValue.name) private productAttributeValueModel:Model<ProductAttributeValueDocument>
  ){}

 async createProductAttribute(createProductAttributeInput: CreateProductAttributeInput) {
      try {
        for (let index = 0; index <  createProductAttributeInput.values.length; index++) {
          const shortId=new ShortUniqueId({ length: 8 ,dictionary:"alphanum_upper"})()
          createProductAttributeInput.values[index].id="AV"+shortId
  
          if(createProductAttributeInput.values[index].image){
  
            const imageUrl = await uploadFile(createProductAttributeInput.values[index].image as FileUpload) as string;
            
            createProductAttributeInput.values[index].image=imageUrl
          }
        }
        const attribute =  await this.productAttributeModel.create({name: createProductAttributeInput.name, attributeSet:createProductAttributeInput.attributeSet})
        await this.productAttributeValueModel.insertMany(createProductAttributeInput.values.map(d=>({...d, productAttribute: attribute._id})))
        return attribute
      } catch (error) {
        throw new InternalServerErrorException('Failed to create attribute'+error.message)
      }
  }

  async findAll(limit:number, offset:number, queryString:string) {
    try{
      const query = { "name": { "$regex": queryString, "$options": "i" }}
      const attributeList = await this.productAttributeModel.find(query).populate({path:'attributeSet'}).sort('-_id').limit(limit).skip(offset)
      const count = await this.productAttributeModel.countDocuments(query)
      return {
        attributeList,
        count
      }
    }
    catch(err){
      throw err;
    }
  }

  async productAttributeValues(limit:number, offset:number){
    try{
      const values = await this.productAttributeValueModel.find({}).populate({path: 'productAttribute'}).sort('-_id')
      const count = await this.productAttributeValueModel.countDocuments({})
      return {count, values}
    }
    catch(err){
      throw err
    }
  }


  async getAll(){
    try{
      const res =  await this.productAttributeModel.aggregate(getAllAttribute)
      return res;
    }catch(err){
      throw err;
    }
  }
}
