import { Args, Resolver, Query } from "@nestjs/graphql";
import { ProductAdminService } from "../services/product-admin.service";
import { AdminProductListDto } from "../dto/admin-product-list.input";
import { AdminProductListResponseDto } from "../dto/admin-product-list-response.dto";
import { Product } from "../entities/product.entity";
import { AdminFeaturedSectionProductFilterInput } from "../dto/admin-featured-section-product-filter.input";

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

    @Query(()=>[Product])
    getProductsForFeaturedSections(
        @Args('adminFeaturedSectionProductFilterInput') adminFeaturedSectionProductFilterInput:AdminFeaturedSectionProductFilterInput
    ){
        return this.productAdminService.getFeaturedSectionProducts(adminFeaturedSectionProductFilterInput)
    }
}