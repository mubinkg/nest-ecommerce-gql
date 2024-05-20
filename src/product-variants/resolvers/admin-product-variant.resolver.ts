import { Resolver,Query, Args } from "@nestjs/graphql";
import { AdminProductVariantService } from "../services/admin-product-variant.service";
import { AdminStockDto } from "../dto/admin-stock.dto";

@Resolver(()=>AdminProductVariantResolver)
export class AdminProductVariantResolver{

    constructor(
        private readonly adminProductVariantService:AdminProductVariantService
    ){}

    @Query(()=>AdminStockDto)
    getAdminStockList(
        @Args('limit', {type: ()=>Number}) limit:number,
        @Args('offset', {type: ()=>Number}) offset:number
    ){
        return this.adminProductVariantService.getStockList({limit,offset})
    }

}