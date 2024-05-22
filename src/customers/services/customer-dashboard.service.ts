import { InjectModel } from "@nestjs/mongoose";
import { Customer, CustomerDocument } from "../entities/customer.entity";
import { Model } from "mongoose";
import { allCustomerWalletAmountQuery } from "../mongo";

export class CustomerDashboardService{
    constructor(
        @InjectModel(Customer.name) private readonly customerModel:Model<CustomerDocument>
    ){}

    async getTotalWalletAmount(){
        try{
            const data = await this.customerModel.aggregate(allCustomerWalletAmountQuery)
            return data[0].total
        }
        catch(err){
            throw err;
        }
    }
}