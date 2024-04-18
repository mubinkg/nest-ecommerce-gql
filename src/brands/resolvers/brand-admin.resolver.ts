import { Args, Query, Resolver } from "@nestjs/graphql";
import { BrandAdminService } from "../services/brand-admin.service";
import { BrandList } from "../dto/brand-list.dto";

@Resolver(()=>BrandAdminResolver)
export class BrandAdminResolver{
    constructor(
        private readonly brandAdminService:BrandAdminService
    ){}

    @Query(() => BrandList, { name: 'adminBrandList' })
    adminBrandList(
        @Args('limit', {type: ()=>Number}) limit:number,
        @Args('offset', {type: ()=>Number}) offset:number
    ) {
        return this.brandAdminService.getAdminBrandList(limit, offset);
    }
}