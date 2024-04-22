import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocuemnt } from "../entities/category.entity";
import { Model } from "mongoose";

@Injectable()
export class CategoriesSliderService{
    constructor(
        @InjectModel(Category.name) private readonly categoryModel:Model<CategoryDocuemnt>
    ){}

    async getCategories(query:string){
        try{
            return await this.categoryModel.find({name: {$regex:query, $options: 'i'}}).select('name').limit(10)
        }
        catch(err){
            throw err;
        }
    }
}