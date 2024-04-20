import { InjectModel } from "@nestjs/mongoose";
import { SliderType, SliderTypeDocument } from "../entities/slider-type.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminSliderService{
    constructor(
        @InjectModel(SliderType.name) private readonly sliderTypeModel:Model<SliderTypeDocument>
    ){}
}