import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { InjectModel } from '@nestjs/mongoose';
import { Rating, RatingDocument } from './entities/rating.entity';
import mongoose, { Model } from 'mongoose';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';
import { DeleteRatingInput } from './dto/delete-rating.dto';
import { RatingFilterDto } from './dto/ratings.filter.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(Rating.name) private readonly ratingModel: Model<RatingDocument>
  ) { }
  async create(createRatingInput: CreateRatingInput) {
    try {
      if (createRatingInput.images.length > 0) {
        let images: string[] = []
        for (let index = 0; index < createRatingInput.images.length; index++) {
          const temp = await uploadFile(createRatingInput.images[index].image as FileUpload) as string;
          images.push(temp)
        }
        createRatingInput.imageUrl = images
      }
      return await this.ratingModel.create(createRatingInput)
    } catch (error) {
      throw new InternalServerErrorException("Error on creating rating", error.message)
    }
  }


  async delete(id: string) {
    
    try {
      await this.ratingModel.findByIdAndUpdate(id, { $set: { status:"inactive" } }, { new: true });
      return "Successfully deleted  review"
    } catch (error) {
      throw new NotFoundException("Your data not found")

    }

  }
  async getRatings(ratingFilterDto: RatingFilterDto) {
    const { product_id, user_id, offset, limit, order,sort } = ratingFilterDto

    let query = {}
    if (product_id) {
      query["product_id"] = new mongoose.Types.ObjectId(product_id as string);
    }
    

    if (user_id) {
      query["user_id"] =new mongoose.Types.ObjectId(user_id as string);
    }

   
      query["status"] ="active";
    
    try {
      return await this.ratingModel.aggregate([{
        $match: query
      },
      { $sort: { createdAt: order } },
      { $skip: offset },
      { $limit: limit }])
    } catch (error) {
     throw new InternalServerErrorException("Error on finding list",error.message)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingInput: UpdateRatingInput) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
