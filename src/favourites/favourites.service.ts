import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFavouriteInput } from './dto/create-favourite.input';
import { UpdateFavouriteInput } from './dto/update-favourite.input';
import { InjectModel } from '@nestjs/mongoose';
import { Favourite, FavouriteDocument } from './entities/favourite.entity';
import { Model } from 'mongoose';
import { convertToObjectId } from 'src/utils/convert-to-objectid';
import { skip } from 'node:test';

@Injectable()
export class FavouritesService {
  constructor( @InjectModel(Favourite.name) private readonly favouriteModel: Model<FavouriteDocument>){}
 
 async create(createFavouriteInput: CreateFavouriteInput) {
    try {
      return await this.favouriteModel.create(createFavouriteInput)
      
    } catch (error) {
      throw new InternalServerErrorException("Error on creating favourites ",error.message)
      
    }
  }

  async findAll(userId:string, limit:number, offset:number) {
    try {
      return await this.favouriteModel.aggregate([
        {
          $match: {
            user: convertToObjectId(userId)
          }
        },
        {
          $lookup: {
            localField: 'product',
            from: 'products',
            foreignField: '_id',
            as: 'product',
            pipeline: [
              {
                $lookup: {
                  from: 'productvariants',
                  localField: '_id',
                  foreignField: 'productId',
                  as: 'productvariants'
                }
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
                seller_id: {
                  $first: "$seller_id",
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
                category_id: {
                  $first: "$category_id",
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
            ]
          }
        },
        {
          $limit: limit,
        },
        {
          $skip: offset
        }
      ])
    } catch (error) {
      throw new InternalServerErrorException("Error on finding",error.message)
      
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} favourite`;
  }

  update(id: string, updateFavouriteInput: UpdateFavouriteInput) {
    return `This action updates a #${id} favourite`;
  }

  async remove(id: string) {
    try {
      await this.favouriteModel.findByIdAndDelete(id)
       return "Successfully removed"
    } catch (error) {
      throw new NotFoundException("Your favourite not found")
      
    }
  }
}
