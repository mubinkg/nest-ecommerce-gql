import { InjectModel } from "@nestjs/mongoose";
import { TicketType, TicketTypeDocument } from "../entities/ticker-type.entity";
import { Model } from "mongoose";
import { NotFoundException, NotImplementedException } from "@nestjs/common";
import { CereateTicketTypeInput } from "../dto/create-ticket-type.input";
import { UpdateTicketType } from "../dto/update-ticket-type.input";

export class TicketTypeService{
    constructor(
        @InjectModel(TicketType.name) private readonly ticketTypeModel:Model<TicketTypeDocument>
    ){}

    async createTicketType(ticketTypeInput:CereateTicketTypeInput): Promise<TicketType>{
        try{
            const ticketType = await this.ticketTypeModel.create(ticketTypeInput)
            return ticketType
        }
        catch(err){
            throw new NotImplementedException('Can not create ticket type.')
        }
    }

    async updateTicketType(updateTicketTypeInput:UpdateTicketType): Promise<TicketType>{
        try{
            await this.ticketTypeModel.findByIdAndUpdate(updateTicketTypeInput.id, {title:updateTicketTypeInput.title})
            return this.ticketTypeModel.findById(updateTicketTypeInput.id)
        }
        catch(err){
            throw new NotImplementedException('Can not update ticket type.')
        }
    }

    async getTicketTypes(limit:number, offset:number){
        try{
            return await this.ticketTypeModel.find({}).limit(limit).skip(offset)
        }
        catch(err){
            throw new NotFoundException('Not found ticket type list')
        }
    }
    async getAdminTicketTypes(limit:number, offset:number){
        try{
            const ticketTypes = await this.ticketTypeModel.find({}).limit(limit).skip(offset)
            const count = await this.ticketTypeModel.countDocuments({})
            return {
                ticketTypes,
                count
            }
        }
        catch(err){
            throw new NotFoundException('Not found ticket type list')
        }
    }

    async deleteTicketType(id:string){
        try{
            return await this.ticketTypeModel.findByIdAndDelete(id)
        }
        catch(err){
            throw err;
        }
    }
}