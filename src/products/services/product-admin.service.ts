import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../entities/product.entity";
import { Model } from "mongoose";
import { AdminProductListDto } from "../dto/admin-product-list.input";
import { convertToObjectId } from "src/utils/convert-to-objectid";
import { adminProductQuery } from "../mongo";
import { AdminFeaturedSectionProductFilterInput } from "../dto/admin-featured-section-product-filter.input";

@Injectable()
export class ProductAdminService{
    constructor(
        @InjectModel(Product.name) private readonly productModel:Model<ProductDocument>
    ){}

    async getAdminProductList(adminProductListDto:AdminProductListDto){
        const query = {}
        if(adminProductListDto?.category){
            query['seller_id'] = convertToObjectId(adminProductListDto.seller)
        }
        if(adminProductListDto?.category){
            query['category_id'] = convertToObjectId(adminProductListDto.category)
        }
        if(adminProductListDto?.status){
            query['status'] = adminProductListDto.status
        }
        const count = await this.productModel.countDocuments(query)
        const products:Product[] = await this.productModel.aggregate(adminProductQuery)
                
        return {
            products,
            count
        }
    }

    async getFeaturedSectionProducts(adminFeaturedSectionProductFilterInput:AdminFeaturedSectionProductFilterInput){
        try{
            const {limit, offset, productType, categories} = adminFeaturedSectionProductFilterInput;
            const query:any = {}
            if(categories && categories.length){
                query['category'] = {
                    $in: categories.map((d)=>convertToObjectId(d))
                }
            }
            if(productType && productType === 'DIGITAL_PRODUCT'){
                query['product_type'] = productType
            }

            return await this.productModel.find(query).select('_id pro_input_name').sort('-_id').limit(limit).skip(offset)
        }
        catch(err){
            throw err;
        }
    }
}