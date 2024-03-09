import { InjectModel } from "@nestjs/mongoose";
import { TicketType, TicketTypeDocument } from "./entities/ticker-type.entity";
import { Model } from "mongoose";
import { NotFoundException, NotImplementedException } from "@nestjs/common";
import { CereateTicketTypeInput } from "./dto/create-ticket-type.input";

export class TicketTypeService{
    constructor(
        @InjectModel(TicketType.name) private readonly ticketTypeModel:Model<TicketTypeDocument>
    ){}

    async createTicketType(ticketTypeInput:CereateTicketTypeInput, user:any): Promise<TicketType>{
        try{
            const userid = user?.id
            const ticketType = this.ticketTypeModel.create({...ticketTypeInput, user:userid})
            return ticketType
        }
        catch(err){
            throw new NotImplementedException('Can not create ticket type.')
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
}