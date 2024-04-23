import { Args, Query, Resolver } from "@nestjs/graphql";
import { FaqAdminService } from "../services/faq-admin.service";
import { FaqAdminDto } from "../dto/faq-admin.dto";

@Resolver(()=>FaqAdminResolver)
export class FaqAdminResolver{
    constructor(
        private readonly faqAdminService:FaqAdminService
    ){}

    @Query(()=>FaqAdminDto)
    adminFaqList(
        @Args('limit', {type:()=>Number}) limit: number,
        @Args('offset', {type:()=>Number}) offset: number,
    ){
        return this.faqAdminService.adminFaqList(limit, offset)
    }
}