import { Query, Resolver } from "@nestjs/graphql";
import { AdminCategoryService } from "../services/admin-category.service";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/customers/jwt-guards";
import { Category } from "../entities/category.entity";

@Resolver(()=>AdminCategoryResolver)
export class AdminCategoryResolver{
    constructor(
        private readonly adminCategoryService:AdminCategoryService
    ){}

    @UseGuards(GqlAuthGuard)
    @Query(()=>[Category])
    getAllCategory(){
        return this.adminCategoryService.getAllCategory()
    }
}