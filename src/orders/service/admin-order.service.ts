import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "../entities/order.entity";
import { Model } from "mongoose";
import { GetAdminOrderInput } from "../dto/admin-order.input";

export class OrderAdminService{
    constructor(
        @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>
    ){}

    async getAdminOrderList(getAdminOrderInput:GetAdminOrderInput){
        
    }

}