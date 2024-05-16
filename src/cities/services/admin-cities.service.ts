import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { City, CityDocument } from "../entities/city.entity";
import { Model } from "mongoose";

@Injectable()
export class AdminCitiesService{
    constructor(
        @InjectModel(City.name) private readonly cityModel:Model<CityDocument>
    ){}

    async adminCityList({limit, offset, query}:{limit:number, offset:number, query:string}){
        try{
            const cities = await this.cityModel.find({city_name:{$regex:query, $options: 'i'}}).limit(limit).skip(offset)
            const count = await this.cityModel.countDocuments({city_name:{$regex:query, $options: 'i'}})
            return {cities,count}
        }
        catch(err){
            throw err;
        }
    }
}