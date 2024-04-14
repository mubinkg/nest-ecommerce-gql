import { Args, Resolver, Query } from "@nestjs/graphql";
import { ProductAdminService } from "../services/product-admin.service";
import { AdminProductListDto } from "../dto/admin-product-list.input";
import { AdminProductListResponseDto } from "../dto/admin-product-list-response.dto";

@Resolver(()=>ProductAdminResolver)
export class ProductAdminResolver{
    constructor(
        private readonly productAdminService:ProductAdminService
    ){}

    @Query(()=>AdminProductListResponseDto)
    getAdminProductList(
        @Args('adminProductListDto') adminProductListDto:AdminProductListDto
    ){
        return this.productAdminService.getAdminProductList(adminProductListDto)
    }  
}