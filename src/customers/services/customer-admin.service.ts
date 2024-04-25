import { InjectModel } from "@nestjs/mongoose";
import { Customer, CustomerDocument } from "../entities/customer.entity";
import { Model } from "mongoose";

export class CustomerAdminService{
    constructor(
        @InjectModel(Customer.name) private readonly customerModel:Model<CustomerDocument>
    ){}

    async getAdminCustomerList(query:string, limit:number, offset:number){
        try{
            const customers = await this.customerModel.find({name: {$regex:query, $options: 'i'}}).limit(limit).skip(offset)
            const count = await this.customerModel.countDocuments({name: {$regex:query, $options: 'i'}})
            return {
                customers,
                count
            }
        }
        catch(err){
            throw err;
        }
    }
}