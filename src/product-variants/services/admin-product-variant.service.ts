import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductVariant, ProductVariantDocument } from "../entities/product-variant.entity";
import { Model } from "mongoose";
import { getStockQery } from "../mongo";

@Injectable()
export class AdminProductVariantService{
    constructor(
        @InjectModel(ProductVariant.name) private readonly productVariantModel:Model<ProductVariantDocument>
    ){}

    async getStockList(
        {limit, offset}:{limit:number, offset:number}
    ){
        try{
            const query = getStockQery({limit,offset, isCount:false})
            const stock = await this.productVariantModel.aggregate(query)
            const countDocument = await this.productVariantModel.aggregate(getStockQery({limit,offset, isCount:true}))
            const count = countDocument[0]?.count || 0
            return {stock, count}
        }
        catch(err){
            throw err;
        }
    }
}