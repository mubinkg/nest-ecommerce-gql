import { InjectModel } from "@nestjs/mongoose";
import { Faq } from "../entities/faq.entity";
import { Model } from "mongoose";
import { FaqDocument } from "../dto/create-faq.input";

export class FaqAdminService{
    constructor(
        @InjectModel(Faq.name) private readonly faqModel:Model<FaqDocument>
    ){}

    async adminFaqList(limit: number, offset:number){
        try{
            const faqs = await this.faqModel.find({}).limit(limit).skip(offset)
            const count = await this.faqModel.countDocuments({})
            return {
                faqs,
                count
            }
        }catch(err){
            throw err;
        }
    }
}