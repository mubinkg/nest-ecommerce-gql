import { InjectModel } from "@nestjs/mongoose";
import { Section, SectionDocuement } from "../entities/section.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminSectionService{
    constructor(
        @InjectModel(Section.name) private readonly sectionModel:Model<SectionDocuement>
    ){}

    async getSetions(query:string, limit:number, offset:number){
        try{
            const sections = await this.sectionModel.find({
                title:{
                    $regex: query, $options: 'i'
                }
            }).sort('-_id').limit(limit).skip(offset)

            const count = await this.sectionModel.countDocuments({
                title:{
                    $regex: query, $options: 'i'
                }
            })
            return {
                sections,
                count
            }
        }
        catch(err){
            throw err;
        }
    }
}
