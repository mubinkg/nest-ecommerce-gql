import { InjectModel } from "@nestjs/mongoose";
import { Brand, BrandDocument } from "../entities/brand.entity";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BrandAdminService{
    constructor(
        @InjectModel(Brand.name) private readonly brandModel:Model<BrandDocument>
    ){}
}