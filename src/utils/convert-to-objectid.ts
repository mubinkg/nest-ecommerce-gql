import mongoose from "mongoose";

export function convertToObjectId(id:string){
    return new mongoose.Types.ObjectId(id)
}