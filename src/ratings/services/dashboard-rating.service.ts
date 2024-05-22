import { InjectModel } from "@nestjs/mongoose";
import { Rating, RatingDocument } from "../entities/rating.entity";
import { Model } from "mongoose";
import {toalRatingQuery} from '../mongo'

export class DashboardRatingService{
    constructor(
        @InjectModel(Rating.name) private readonly ratingModel:Model<RatingDocument>
    ){}

    async getRatingValues(){
        try{
            const ratingData = await this.ratingModel.aggregate(toalRatingQuery)
            const total = ratingData[0]?.total || 0
            const count = await this.ratingModel.countDocuments({})
            return {total, count}
        }
        catch(err){
            throw err;
        }
    }
}