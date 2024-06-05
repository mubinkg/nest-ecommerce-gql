import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductVariant, ProductVariantDocument } from "../entities/product-variant.entity";
import { Model } from "mongoose";

@Injectable()
export class OrderProductVariantServie{
    constructor(
        @InjectModel(ProductVariant.name) private readonly productVariantModel:Model<ProductVariantDocument>
    ){}

    async getVariantListWithQuantity(variants:string[], quantities:number[]){
        try{
            const variantList = await this.productVariantModel.find({_id:{
                $in: variants
            }})

            return variantList.map((variant:ProductVariant, i:number)=>({product_variant:variant, quantity: quantities[i]}))
        }
        catch(err){
            throw err;
        }
    }
}