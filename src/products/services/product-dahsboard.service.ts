import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../entities/product.entity";
import { Model } from "mongoose";
import { convertToObjectId } from "src/utils/convert-to-objectid";
import { categoryWiseSellerProduct } from "../mongo";

export class ProductDashboardServic{
    constructor(
        @InjectModel(Product.name) private readonly productModel:Model<ProductDocument>
    ){}

    async getSellerProduct(sellerId:string){
        try{
            return await this.productModel.countDocuments({seller: convertToObjectId(sellerId)})
        }catch(err){
            throw err;
        }
    }

    async getSellerCategoryWiseProducts(sellerId:string){
        try{
            const data = await this.productModel.aggregate(categoryWiseSellerProduct(sellerId))
            return data
        }
        catch(err){
            throw err;
        }
    }
}