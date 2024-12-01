import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FaqAdminService } from "../services/faq-admin.service";
import { FaqAdminDto } from "../dto/faq-admin.dto";
import { Faq } from "../entities/faq.entity";
import { FaqAdminInput } from "../dto/faq-admin.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/customers/jwt-guards";
import { CurrentUser } from "src/decorator/current-user.decorator";

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

    @Mutation(()=>Faq)
    @UseGuards(GqlAuthGuard)
    createAdminFaq(
        @Args('faqAdminInput', {type:()=> FaqAdminInput})faqAdminInput:FaqAdminInput, 
        @CurrentUser('user') user:any
    ){
        return this.faqAdminService.createFaqAdmin(faqAdminInput, user)
    }

    @Query(()=>FaqAdminDto)
    @UseGuards(GqlAuthGuard)
    getProductFaqList(
        @Args('limit', {type:()=>Number}) limit: number,
        @Args('offset', {type:()=>Number}) offset: number,
        @Args('productId', {type:()=>String}) productId: string,
    ){
        return this.faqAdminService.adminProductFaqList(limit,offset, productId)
    }
}