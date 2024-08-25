import { InjectModel } from "@nestjs/mongoose";
import { ProductAttributeSet, ProductAttributeSetDocument } from "../entities/product-attribute-set.entity";
import { Model } from "mongoose";
import { CreateProductAttributeSetInput } from "../dto/create-product-attribute-set.input";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { getAttributeSetValues } from "../mongo";


@Injectable()
export class ProductAttributeSetService{
    constructor(
        @InjectModel(ProductAttributeSet.name) private productAttributeSetModel:Model<ProductAttributeSetDocument>
    ){}

    async createProductAttributeSet(createProductAttributeSetInput:CreateProductAttributeSetInput){

        let attributeSet

        try {
            attributeSet=await this.productAttributeSetModel.create(createProductAttributeSetInput)
        } catch (error) {
            throw new InternalServerErrorException('Failed to create Product attribute set'+error.message)
        }

        return attributeSet
    }

    async getProductAttributeSetList(limit:number, offset:number, queryString: string){
        try{
            const query = { "attributeSetName": { "$regex": queryString, "$options": "i" }}
            const productAttributeSetList = await this.productAttributeSetModel.find(query).sort('-_id').limit(limit).skip(offset)
            const count = await this.productAttributeSetModel.countDocuments(query)
            return {
                productAttributeSetList,
                count
            }
        }
        catch(err){
            throw err;
        }
    }

    async getAttributeValuesByAttributeSet(){
        try{
            const data = await this.productAttributeSetModel.aggregate(getAttributeSetValues)
            const results = []
            data?.forEach(d=>{
                const attributeSet = {
                    _id: d._id,
                    attributeSetName: d.attributeSetName
                }
                const attributeValues = []
                d?.attributes?.forEach(attribute=>{
                    attribute?.productAttributes?.forEach(value=>{
                        attributeValues.push(value)
                    })
                })
                attributeSet['attributeSetValues'] = attributeValues
                results.push(attributeSet)
            })
            return results
        }
        catch(err){
            throw err;
        }
    }
}