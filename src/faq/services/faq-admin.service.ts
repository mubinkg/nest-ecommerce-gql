import { InjectModel } from "@nestjs/mongoose";
import { Faq } from "../entities/faq.entity";
import { Model } from "mongoose";
import { FaqDocument } from "../dto/create-faq.input";
import { FaqAdminInput } from "../dto/faq-admin.input";
import { convertToObjectId } from "src/utils/convert-to-objectid";

export class FaqAdminService{
    constructor(
        @InjectModel(Faq.name) private readonly faqModel:Model<FaqDocument>
    ){}

    async adminFaqList(limit: number, offset:number){
        try{
            const faqs = await this.faqModel.find({}).populate({path: 'user'}).limit(limit).skip(offset)
            const count = await this.faqModel.countDocuments({})
            return {
                faqs,
                count
            }
        }catch(err){
            throw err;
        }
    }

    async createFaqAdmin(faqAdminInput:FaqAdminInput, user:any){
        try{
            return await this.faqModel.create({...faqAdminInput, user: user.userId})
        }
        catch(err){
            throw err;
        }
    }

    async adminProductFaqList(limit: number, offset:number, productId:string){
        try{
            const faqs = await this.faqModel.find({product: convertToObjectId(productId)}).populate({path: 'user'}).limit(limit).skip(offset)
            const count = await this.faqModel.countDocuments({product: convertToObjectId(productId)})
            return {
                faqs,
                count
            }
        }catch(err){
            throw err;
        }
    }
}