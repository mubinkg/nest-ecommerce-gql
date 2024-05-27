import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocuemnt } from "../entities/category.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminCategoryService{
    constructor(
        @InjectModel(Category.name) private readonly categoryModel:Model<CategoryDocuemnt>
    ){}

    async getAllCategory(){
        try{
            return await this.categoryModel.find({}).select('_id name')
        }catch(err){
            throw err;
        }
    }
}