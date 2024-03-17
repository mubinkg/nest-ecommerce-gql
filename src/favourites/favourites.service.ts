import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFavouriteInput } from './dto/create-favourite.input';
import { UpdateFavouriteInput } from './dto/update-favourite.input';
import { InjectModel } from '@nestjs/mongoose';
import { Favourite, FavouriteDocument } from './entities/favourite.entity';
import { Model } from 'mongoose';
import { convertToObjectId } from 'src/utils/convert-to-objectid';

@Injectable()
export class FavouritesService {
  constructor( @InjectModel(Favourite.name) private readonly favouriteModel: Model<FavouriteDocument>){}
 
 async create(createFavouriteInput: CreateFavouriteInput) {
    try {
      return await this.favouriteModel.create({user: createFavouriteInput.user_Id, product: createFavouriteInput.product_id})
      
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
            as: 'product'
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
