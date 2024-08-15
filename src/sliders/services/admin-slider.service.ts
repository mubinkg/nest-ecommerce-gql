import { InjectModel } from "@nestjs/mongoose";
import { SliderType, SliderTypeDocument } from "../entities/slider-type.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { Slider, SliderDocument } from "../entities/slider.entity";

@Injectable()
export class AdminSliderService{
    constructor(
        @InjectModel(SliderType.name) private readonly sliderTypeModel:Model<SliderTypeDocument>,
        @InjectModel(Slider.name) private readonly sliderModel:Model<SliderDocument>
    ){}

    async getSliderType(){
        try{
            return await this.sliderTypeModel.find({})
        }
        catch(err){
            throw err;
        }
    }

    async adminSliderList(limit: number, offset: number, type:string){
        try{
            const query = {}
            if(type && type === 'offer'){
                query['type'] = 'offer'
            }else{
                query['type'] = {$ne:"offer"}
            }

            console.log(query)

            const sliders = await this.sliderModel.find(query).sort('-_id').populate({
                path: "slider_type"
            }).limit(limit).skip(offset)
            const count = await this.sliderModel.countDocuments(query)
            return {
                sliders,
                count
            }
        }
        catch(err){
            throw err;
        }
    }
}