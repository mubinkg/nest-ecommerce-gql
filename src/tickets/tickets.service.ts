import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './entities/ticket.entity';
import { Model } from 'mongoose';

@Injectable()
export class TicketsService {

  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel:Model<TicketDocument>
  ){}

  async create(createTicketInput: CreateTicketInput, user:any) {
    try{
      return await this.ticketModel.create({...createTicketInput, user: user?.id})
    }catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all tickets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketInput: UpdateTicketInput) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
