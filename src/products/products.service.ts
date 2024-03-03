import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import mongoose, { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { ProductVariantsService } from './../product-variants/product-variants.service';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';
import { VideoType } from './enum';
import { GetProductDto } from './dto/get-products.dto';

@Injectable()
export class ProductsService {

  constructor(
    private productVariantsService : ProductVariantsService,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ){}

  async create(createProductInput: CreateProductInput) {
    const {createProductVariantInput} = createProductInput
    
    try{

      if(createProductInput.pro_input_image){
        createProductInput.pro_input_image= await uploadFile(createProductInput.pro_input_image as FileUpload) as string
      }

    if(createProductInput.other_imagesInput && createProductInput.other_imagesInput.length>0){

      let imageArray=[]
      
        for (let index = 0; index <  createProductInput.other_imagesInput.length; index++) {
          
          if(createProductInput.other_imagesInput[index]){

            const imageUrl = await uploadFile(createProductInput.other_imagesInput[index].image as FileUpload) as string;
            
            imageArray.push(imageUrl)
          }
        }

        createProductInput.other_images=imageArray

    }

    if(createProductInput.video_type && createProductInput.video_type===VideoType.SELF_HOSTED && createProductInput.pro_input_video){
      createProductInput.pro_input_video= await uploadFile(createProductInput.pro_input_video as FileUpload) as string
    }
      const product = await this.productModel.create(createProductInput)
      const productVariant = await this.productVariantsService.create(createProductVariantInput.map((d)=>({...d, productId: product._id})))
      return product
    }catch(err){
      Logger.log(err)
      return new NotImplementedException('Can not create product'+err.message)
    }
  }

  async findAll(getProductInputDto:GetProductDto) {
    try{
      const query = []
      const matchStage = {}

      if(getProductInputDto.id){
        matchStage['_id'] = new mongoose.Types.ObjectId(getProductInputDto.id)
      }
      if(getProductInputDto.category_id){
        matchStage['category_id'] = getProductInputDto.category_id
      }
      if(getProductInputDto.seller_id){
        matchStage['seller_id'] = new mongoose.Types.ObjectId(getProductInputDto.seller_id)
      }
      query.push({
        $match:matchStage
      })

      // Add pagination.
      if(getProductInputDto.limit){
        query.push({
          $limit: getProductInputDto.limit
        })
      }
      if(getProductInputDto.offset){
        query.push({
          $skip:getProductInputDto.offset
        })
      }

      return await this.productModel.aggregate(query)
    }
    catch(err){
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
