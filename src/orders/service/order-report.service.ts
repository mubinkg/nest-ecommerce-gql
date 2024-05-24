import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "../entities/order.entity";
import { Model } from "mongoose";
import { salesReportQuery } from "../mongo";

@Injectable()
export class OrderReportService{
    constructor(
        @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>
    ){}

    async getSelsReport(seller:string, limit:number, offset:number){
        try{
            const orders = await this.orderModel.aggregate(salesReportQuery(seller, limit, offset, false))
            const countData = await this.orderModel.aggregate(salesReportQuery(seller, limit, offset, true))
            const count = countData[0]?.count || 0
            return {
                orders,
                count
            }
        }
        catch(err){
            throw err;
        }
    }
}