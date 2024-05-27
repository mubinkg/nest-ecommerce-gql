import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "../entities/order.entity";
import { Model } from "mongoose";
import { sellerOrderCount } from "../mongo";

@Injectable()
export class OrderDashboardServie{
    constructor(
        @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>
    ){}

    async getSellerOrderCount(sellerId:string){
        try{
            const data = await this.orderModel.aggregate(sellerOrderCount(sellerId))
            const count = data[0]?.total || 0
            return count    
        } 
        catch(err){
            throw err;
        }
    }

    async getStatusWiseCount(){
        try{
            return await this.orderModel.aggregate([
                {
                  $group:
                    {
                      _id: "$status",
                      statusCount: {
                        $sum: 1,
                      },
                    },
                },
              ])
        }
        catch(err){
            throw err;
        }
    }
}