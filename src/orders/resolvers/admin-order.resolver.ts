import { Args, Resolver, Query } from "@nestjs/graphql";
import { OrderAdminService } from "../service/admin-order.service";
import { GetAdminOrderInput } from "../dto/admin-order.input";

@Resolver(()=>OrderAdminResolver)
export class OrderAdminResolver{
    constructor(
        private readonly orderAdminService:OrderAdminService
    ){}

    @Query(()=>String, {nullable:true})
    getAdminOrderList(
        @Args('adminOrderListInput') getAdminOrderInput:GetAdminOrderInput
    ){
        return this.orderAdminService.getAdminOrderList(getAdminOrderInput)
    }
}