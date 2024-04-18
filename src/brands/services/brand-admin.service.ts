import { InjectModel } from "@nestjs/mongoose";
import { Brand, BrandDocument } from "../entities/brand.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BrandAdminService{
    constructor(
        @InjectModel(Brand.name) private readonly brandModel:Model<BrandDocument>
    ){}

    async getAdminBrandList(limit: number, offset:number){
        try{
            const brands = await this.brandModel.find({}).limit(limit).skip(offset)
            const total = await this.brandModel.countDocuments({})
            return {
              brands, total
            }
        }
        catch(err){
            throw err;
        }
    }
}