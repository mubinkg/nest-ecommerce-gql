import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductAttributeInput } from './dto/create-product-attribute.input';
import { UpdateProductAttributeInput } from './dto/update-product-attribute.input';
import { InjectModel } from '@nestjs/mongoose';
import { ProductAttribute, ProductAttributeDocument } from './entities/product-attribute.entity';
import { Model } from 'mongoose';
import ShortUniqueId from 'short-unique-id';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class ProductAttributesService {

  constructor(
    @InjectModel(ProductAttribute.name) private productAttributeModel: Model<ProductAttributeDocument>
  ){}

 async createProductAttribute(createProductAttributeInput: CreateProductAttributeInput) {

     let attribute

     let createInputArray=[]

     for (let index = 0; index <  createProductAttributeInput.values.length; index++) {
              const shortId=new ShortUniqueId({ length: 8 ,dictionary:"alphanum_upper"})()
              createProductAttributeInput.values[index].id="AV"+shortId

              if(createProductAttributeInput.values[index].image){

                const imageUrl = await uploadFile(createProductAttributeInput.values[index].image as FileUpload) as string;
                
                createProductAttributeInput.values[index].image=imageUrl
              }
     }

      createProductAttributeInput.values.map((element)=>{
          createInputArray.push({name:createProductAttributeInput.name,attributeSet:createProductAttributeInput.attributeSet,values:element})
      })


      try {
        attribute= await this.productAttributeModel.insertMany(createInputArray)
      } catch (error) {
        throw new InternalServerErrorException('Failed to create attribute'+error.message)
      }

    return attribute;
  }

  findAll() {
    return `This action returns all productAttributes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productAttribute`;
  }

  update(id: number, updateProductAttributeInput: UpdateProductAttributeInput) {
    return `This action updates a #${id} productAttribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} productAttribute`;
  }
}
