import { InjectModel } from "@nestjs/mongoose";
import { Area, AreaDocument } from "../entities/area.entity";
import { Model } from "mongoose";

export class AdminAreaService{
    constructor(
        @InjectModel(Area.name) private readonly areaModel:Model<AreaDocument>
    ){}

    async getAdminAreaList({limit, offset, query}:{limit:number, offset:number, query:string}){
        try{
            const areas = await this.areaModel.find({area_name:{$regex:query, $options: 'i'}}).limit(limit).skip(offset)
            const count = await this.areaModel.countDocuments({area_name:{$regex:query, $options: 'i'}})

            return {areas, count};
        }
        catch(err){
            throw err;
        }
    }
}