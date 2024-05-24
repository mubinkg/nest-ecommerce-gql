import { Query, Resolver } from "@nestjs/graphql";
import { OrderReportService } from "../service/order-report.service";
import { CurrentUser } from "src/decorator/current-user.decorator";

@Resolver(()=>OrderReportResolver)
export class OrderReportResolver{

    constructor(
        private readonly orderReportService:OrderReportService
    ){}

    @Query(()=>String, {nullable:true})
    salesReport(
        @CurrentUser('user') user:any
    ){
        return this.orderReportService.getSelsReport(user.userId)
    }
}