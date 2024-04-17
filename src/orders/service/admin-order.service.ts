import { InjectModel } from "@nestjs/mongoose";
import { Order, OrderDocument } from "../entities/order.entity";
import { Model } from "mongoose";
import { GetAdminOrderInput } from "../dto/admin-order.input";

export class OrderAdminService{
    constructor(
        @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>
    ){}

    async getAdminOrderList(getAdminOrderInput:GetAdminOrderInput){
        const query = {}
        const orders = await this.orderModel.find(query).populate({path: 'user',}).populate({
            path: 'product_variants',
            populate: {
                path: 'productId',
                populate: {
                    path: 'seller'
                }
            }
        })
        const count = await this.orderModel.countDocuments(query)
        return {
            orders,
            count
        }
    }

}