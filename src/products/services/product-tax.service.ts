import { Injectable, NotImplementedException } from "@nestjs/common";
import { CreateProductTaxInput } from "../dto/create-product-tax.input";
import { InjectModel } from "@nestjs/mongoose";
import { ProductTax, ProductTaxDocument } from "../entities/product-tax.entity";
import { Model } from "mongoose";

@Injectable()
export class ProductTaxService{
    constructor(
        @InjectModel(ProductTax.name) private readonly productTaxModel:Model<ProductTaxDocument>
    ){}

    async create(createProductTaxInput: CreateProductTaxInput){
        try{
            return await this.productTaxModel.create(createProductTaxInput)
        }
        catch(err){
            throw new NotImplementedException('Can not create product tax.')
        }
    }
}