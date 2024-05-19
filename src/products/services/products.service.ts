import { Injectable, InternalServerErrorException, NotAcceptableException, NotImplementedException } from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../entities/product.entity';
import mongoose, { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { ProductVariantsService } from '../../product-variants/product-variants.service';
import { GetProductDto } from '../dto/get-products.dto';
import { UpdateProductGlobalOrderNoInput } from '../dto/updateGlobalOrderNo.input';
import { ProductAttributeInput } from '../dto/product-attribute.input';
import { convertToObjectId } from 'src/utils/convert-to-objectid';

@Injectable()
export class ProductsService {

  constructor(
    private productVariantsService: ProductVariantsService,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
  ) { }

  async create(createProductInput: CreateProductInput) {
    const { createProductVariantInput } = createProductInput
    
    try {
      createProductInput.attributes = createProductInput.attributes.map((d:ProductAttributeInput)=>({
        ...d,
        attribute: convertToObjectId(d.attribute),
        values: d.values.map((d:any)=>convertToObjectId(d))
      }))
      const productCount= await this.productModel.countDocuments()

      createProductInput.globalOrderNo=productCount+1

      const product = await this.productModel.create(createProductInput)
      
      const productVariant = await this.productVariantsService.create(createProductVariantInput.map((d) => ({ ...d, product: product._id })))
      
      return product
    
    } catch (err) {
      Logger.log(err)
      return new NotImplementedException('Can not create product' + err.message)
    }
  }

  async findAll(getProductInputDto: GetProductDto) {

    const { id, category_id, search, tags, attribute_value_ids, sort, order, min_price, max_price, seller_id, offset, limit } = getProductInputDto;
    try {
      const matchFirstStage = {}

      if (id) {
        matchFirstStage['_id'] = new mongoose.Types.ObjectId(id)
      }
      if (seller_id) {
        matchFirstStage['seller'] = new mongoose.Types.ObjectId(seller_id)
      }
      if (category_id) {
        matchFirstStage['category'] = new mongoose.Types.ObjectId(category_id)
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


      const res = await this.productModel.aggregate([
        {
          $match: matchFirstStage
        }, 
        {
          $lookup: {
            from: 'productvariants',
            localField: '_id',
            foreignField: 'product',
            as: 'productvariants'
          }
        }, 
        {
          $match: matchSecondStage
        },
        {
          $unwind: {
            path: "$productvariants",
            includeArrayIndex: "index",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "productattributes",
            localField:
              "productvariants.attributeReference",
            foreignField: "_id",
            as: "productvariants.attributes",
          },
        },
        {
          $addFields: {
            "productvariants.attributes": {
              $arrayElemAt: [
                "$productvariants.attributes.values",
                0,
              ],
            },
          },
        },
      {
        $group: {
          _id: "$_id",
          pro_input_name: {
            $first: "$pro_input_name",
          },
          seller: {
            $first: "$seller",
          },
          short_description: {
            $first: "$short_description",
          },
          tags: {
            $first: "$tags",
          },
          indicator: {
            $first: "$indicator",
          },
          made_in: {
            $first: "$made_in",
          },
          brand: {
            $first: "$brand",
          },
          total_allowed_quantity: {
            $first: "$total_allowed_quantity",
          },
          minimum_order_quantity: {
            $first: "$minimum_order_quantity",
          },
          quantity_step_size: {
            $first: "$quantity_step_size",
          },
          warranty_period: {
            $first: "$warranty_period",
          },
          guarantee_period: {
            $first: "$guarantee_period",
          },
          download_allowed: {
            $first: "$download_allowed",
          },
          download_link_type: {
            $first: "$download_link_type",
          },
          pro_input_zip: {
            $first: "$pro_input_zip",
          },
          download_link: {
            $first: "$download_link",
          },
          is_returnable: {
            $first: "$is_returnable",
          },
          is_cancelable: {
            $first: "$is_cancelable",
          },
          cancelable_till: {
            $first: "$cancelable_till",
          },
          pro_input_image: {
            $first: "$pro_input_image",
          },
          other_images: {
            $first: "$other_images",
          },
          video_type: {
            $first: "$video_type",
          },
          video: {
            $first: "$video",
          },
          pro_input_video: {
            $first: "$pro_input_video",
          },
          pro_input_description: {
            $first: "$pro_input_description",
          },
          extra_input_description: {
            $first: "$extra_input_description",
          },
          attribute_values: {
            $first: "$attribute_values",
          },
          status: {
            $first: "$status",
          },
          category: {
            $first: "$category",
          },
          tax: {
            $first: "$tax",
          },
          product_type: {
            $first: "$product_type",
          },
          productvariants: {
            $push: "$productvariants",
          },
        },
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

      return res;
    }
    catch (err) {
      throw new InternalServerErrorException('Can not find products');
    }
  }


  async updateProductGlobalOrderNo(updateProductGlobalOrderNoInput:UpdateProductGlobalOrderNoInput){

    const {productArray}=updateProductGlobalOrderNoInput

    let updateArrayInput=[],updatedProducts

    if(productArray.length===0){
      throw new NotAcceptableException(`Product array length cannot be zero`)
    }

    try {

      productArray.map((element)=>{
          updateArrayInput.push({ updateOne :
            {
               "filter": {_id:element._id},
               "update": {globalOrderNo:element.globalOrderNo},            // Changed in 4.2
            }
         })
      })

      updatedProducts= await this.productModel.bulkWrite(updateArrayInput)

      
    } catch (error) {
        throw new InternalServerErrorException('Failed to update product order no')
    }

    return "Successfully updated"

  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    try{
      await this.productModel.findByIdAndDelete(id)
      return 'Deleted ' + id
    }
    catch(err){
      throw err
    }
  }
}
