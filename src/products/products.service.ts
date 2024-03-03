import { Injectable, InternalServerErrorException, NotImplementedException } from '@nestjs/common';
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
import internal from 'stream';

@Injectable()
export class ProductsService {

  constructor(
    private productVariantsService: ProductVariantsService,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ) { }

  async create(createProductInput: CreateProductInput) {
    const { createProductVariantInput } = createProductInput

    try {

      if (createProductInput.pro_input_image) {
        createProductInput.pro_input_image = await uploadFile(createProductInput.pro_input_image as FileUpload) as string
      }

      if (createProductInput.other_imagesInput && createProductInput.other_imagesInput.length > 0) {

        let imageArray = []

        for (let index = 0; index < createProductInput.other_imagesInput.length; index++) {

          if (createProductInput.other_imagesInput[index]) {

            const imageUrl = await uploadFile(createProductInput.other_imagesInput[index].image as FileUpload) as string;

            imageArray.push(imageUrl)
          }
        }

        createProductInput.other_images = imageArray

      }

      if (createProductInput.video_type && createProductInput.video_type === VideoType.SELF_HOSTED && createProductInput.pro_input_video) {
        createProductInput.pro_input_video = await uploadFile(createProductInput.pro_input_video as FileUpload) as string
      }
      const product = await this.productModel.create(createProductInput)
      const productVariant = await this.productVariantsService.create(createProductVariantInput.map((d) => ({ ...d, productId: product._id })))
      return product
    } catch (err) {
      Logger.log(err)
      return new NotImplementedException('Can not create product' + err.message)
    }
  }

  async findAll(getProductInputDto: GetProductDto) {

    const { id, category_id, search, tags, attribute_value_ids, sort, order, min_price, max_price, seller_id, offset, limit } = getProductInputDto;
    try {
      //first stage
      const matchFirstStage = {}

      if (id) {
        matchFirstStage['_id'] = new mongoose.Types.ObjectId(id)
      }
      if (seller_id) {
        matchFirstStage['seller_id'] = new mongoose.Types.ObjectId(seller_id)
      }
      if (category_id) {
        matchFirstStage['category_id'] = new mongoose.Types.ObjectId(category_id)
      }

      //tags not implemented
      if (tags) {
        matchFirstStage['tags'] = tags
      }
      //attribute_value_ids not implemented

      //second stage
      let matchSecondStage = {}

      if (attribute_value_ids) {
        const ids = attribute_value_ids.split(',').map((d) => new mongoose.Types.ObjectId(d))
        matchSecondStage['productvariants.attributeReference'] = { $in: ids }
      }
      if (min_price) {
        matchSecondStage['productvariants.price'] = { $gte: min_price }

      }
      if (max_price) {
        matchSecondStage['productvariants.price'] = { $lte: max_price }
      }
      //sort 
      const sortObj = {};
      if (sort)
        sortObj[sort] = order;


      return await this.productModel.aggregate([{
        $match: matchFirstStage
      }, {
        $lookup: {
          from: 'productvariants',
          localField: '_id',
          foreignField: 'productId',
          as: 'productvariants'
        }
      }, {
        $match: matchSecondStage
      },
      {
        $sort: sortObj
      },
      {
        $skip: offset
      },
      {
        $limit: limit
      },
      ])
    }
    catch (err) {
      throw new InternalServerErrorException('Can not find products');
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
