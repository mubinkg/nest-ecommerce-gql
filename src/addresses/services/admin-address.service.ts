import { InjectModel } from "@nestjs/mongoose";
import { Address, AddressDocument } from "../entities/address.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminAddressService{
    constructor(
        @InjectModel(Address.name) private readonly addressModel:Model<AddressDocument>
    ){}
}