import { Args, Resolver, Query } from "@nestjs/graphql";
import { OrderAdminService } from "../service/admin-order.service";
import { GetAdminOrderInput } from "../dto/admin-order.input";
import { AdminOrderResponse, AdminSalesInventory } from "../dto/admin-order.response.dto";

@Resolver(()=>OrderAdminResolver)
export class OrderAdminResolver{
    constructor(
        private readonly orderAdminService:OrderAdminService
    ){}

    @Query(()=>AdminOrderResponse, {nullable:true})
    getAdminOrderList(
        @Args('adminOrderListInput') getAdminOrderInput:GetAdminOrderInput
    ){
        return this.orderAdminService.getAdminOrderList(getAdminOrderInput)
    }

    @Query(()=>AdminSalesInventory, {nullable:true})
    adminSalesInventory(
        @Args('limit') limit:number,
        @Args('offset') offset:number
    ){

    }
}