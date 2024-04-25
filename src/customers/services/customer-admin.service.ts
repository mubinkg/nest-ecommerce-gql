import { InjectModel } from "@nestjs/mongoose";
import { Customer, CustomerDocument } from "../entities/customer.entity";
import { Model } from "mongoose";

export class CustomerAdminService{
    constructor(
        @InjectModel(Customer.name) private readonly customerModel:Model<CustomerDocument>
    ){}

    async getAdminCustomerList(

    ){}
}