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

    async adminSliderList(limit: number, offset: number){
        try{
            const sliders = await this.sliderModel.find({}).sort('-_id').populate({
                path: "slider_type"
            }).limit(limit).skip(offset)
            const count = await this.sliderModel.countDocuments({})
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