import { InjectModel } from "@nestjs/mongoose";
import { Favourite, FavouriteDocument } from "../entities/favourite.entity";
import { Model } from "mongoose";
import { convertToObjectId } from "src/utils/convert-to-objectid";

export class FavoriteProductService{
    constructor(
        @InjectModel(Favourite.name) private readonly favoriteModel:Model<FavouriteDocument>
    ){}

    async getFavoriteProductList(userId:string):Promise<string[]>{
        try{
            const favorites = await this.favoriteModel.find({user: convertToObjectId(userId)})
            return favorites.map((d:Favourite)=>d.product._id.toString())
        }
        catch(err){
            throw err;
        }
    }

    async getFavoriteProduct(userId:string, productId:string):Promise<boolean>{
        try{
            const isExist = await this.favoriteModel.exists({user: convertToObjectId(userId), product: convertToObjectId(productId)})
            return isExist?._id ? true : false
        }
        catch(err){
            throw err;
        }
    }
}