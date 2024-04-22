import { Args, Query, Resolver } from "@nestjs/graphql";
import { AdminSliderService } from "../services/admin-slider.service";
import { SliderType } from "../entities/slider-type.entity";
import { ProductSliderService } from "src/products/services/product-slider.service";
import { SliderProduct } from "../dto/slider-product.dto";
import { SliderCategory } from "../dto/slider-category.dto";
import { CategoriesSliderService } from "src/categories/services/categories-slider.service";

@Resolver(()=>AdminSliderResolver)
export class AdminSliderResolver{
    constructor(
        private readonly adminSliderService:AdminSliderService,
        private readonly productSliderService:ProductSliderService,
        private readonly categoriesSliderService:CategoriesSliderService
    ){
    }

    @Query(()=>[SliderType], {nullable:true})
    sliderType(){
        return this.adminSliderService.getSliderType()
    }

    @Query(()=>[SliderProduct], {nullable:true})
    sliderProduct(
        @Args({type: ()=>String, name: 'query'}) query:string
    ){
        return this.productSliderService.getProduct(query)
    }

    @Query(()=>[SliderCategory], {nullable:true})
    sliderCategory(
        @Args({type: ()=>String, name: 'query'}) query:string
    ){
        return this.categoriesSliderService.getCategories(query)
    }
}