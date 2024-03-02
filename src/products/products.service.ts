import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { ProductVariantsService } from './../product-variants/product-variants.service';
import { CreateProductVariantInput } from './../product-variants/dto/create-product-variant.input';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';
import { VideoType } from './enum';

@Injectable()
export class ProductsService {

  constructor(
    private productVariantsService : ProductVariantsService,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ){}

  async create(createProductInput: CreateProductInput) {
    // const {createProductVariantInput} = createProductInput
    try{
      console.log(createProductInput)
    //   const productVariant = await this.productVariantsService.create(createProductVariantInput)

 
    //  // delete createProductInput.createProductVariantInput;
    //   createProductInput.variant_id = productVariant._id;

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

      // await this.productVariantsService.update(productVariant._id,product._id)
      return product
    }catch(err){
      Logger.log(err)
      return new NotImplementedException('Can not create product'+err.message)
    }
  }

  findAll() {
    return `This action returns all products`;
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
