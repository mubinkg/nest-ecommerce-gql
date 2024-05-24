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

    async getSelsReport(seller:string){
        try{
            const data = await this.orderModel.aggregate(salesReportQuery(seller))
            console.log(data)
        }
        catch(err){
            throw err;
        }
    }
}