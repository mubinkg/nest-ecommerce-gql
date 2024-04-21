import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../entities/product.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductSliderService{
    constructor(
        @InjectModel(Product.name) private readonly productModel:Model<ProductDocument>
    ){}

    async getProduct(query){
        try{
            return await this.productModel.find({pro_input_name: {$regex:query, $options: 'i'}}).limit(10).select('pro_input_name')
        }catch(err){
            throw err;
        }
    }
}