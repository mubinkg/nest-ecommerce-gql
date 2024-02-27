import { Args, Resolver } from "@nestjs/graphql";
import { ProductTaxService } from "../services/product-tax.service";
import { CreateProductTaxInput } from "../dto/create-product-tax.input";

@Resolver(()=>ProductTaxResolver)
export class ProductTaxResolver{
    constructor(
        private readonly productTaxService:ProductTaxService
    ){}

    createProductTax(
        @Args('createProductTaxInput') createProductTaxInput: CreateProductTaxInput
    ){
        return this.productTaxService.create(createProductTaxInput)
    }
}