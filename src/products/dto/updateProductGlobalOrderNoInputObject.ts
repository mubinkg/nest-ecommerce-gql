import { Field, InputType } from "@nestjs/graphql";
import mongoose from "mongoose";

@InputType()
export class UpdateProductGlobalOrderNoInputObject{
    @Field(()=>String)
    _id:mongoose.Types.ObjectId

    @Field(()=>Number)
    globalOrderNo:number
}