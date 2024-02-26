import { InjectModel } from "@nestjs/mongoose";
import { ProductAttributeSet, ProductAttributeSetDocument } from "./entities/product-attribute-set.entity";
import { Model } from "mongoose";
import { CreateProductAttributeSetInput } from "./dto/create-product-attribute-set.input";
import { Injectable, InternalServerErrorException } from "@nestjs/common";


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
}