import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "../entities/order.entity";
import { Model } from "mongoose";

@Injectable()
export class OrderDashboardServie{
    constructor(
        @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>
    ){}

    getSellerOrderCount(sellerId:string){
        
    }
}