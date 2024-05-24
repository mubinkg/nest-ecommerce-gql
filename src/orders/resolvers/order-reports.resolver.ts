import { Args, Query, Resolver } from "@nestjs/graphql";
import { OrderReportService } from "../service/order-report.service";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/customers/jwt-guards";
import { Order } from "../entities/order.entity";
import { SalesReportDto } from "../dto/sales-report.dto";

@Resolver(()=>OrderReportResolver)
export class OrderReportResolver{

    constructor(
        private readonly orderReportService:OrderReportService
    ){}

    @Query(()=>SalesReportDto, {nullable:true})
    @UseGuards(GqlAuthGuard)
    salesReport(
        @Args('limit', {type:()=>Number}) limit:number,
        @Args('offset', {type:()=>Number}) offset:number,
        @CurrentUser('user') user:any
    ){
        return this.orderReportService.getSelsReport(user.userId, limit, offset)
    }
}