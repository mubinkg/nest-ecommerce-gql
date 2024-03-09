import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDocument } from './entities/ticket.entity';
import { Model } from 'mongoose';
import { GetTicketsDto } from './dto/get-ticket.dto';
import { convertToObjectId } from 'src/utils/convert-to-objectid';

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

  async findAll(getTicketDto:GetTicketsDto) {
    try{
      const query = {}
      const sortOrder = {
        _id: '-1'
      }
      if(getTicketDto?.ticket_id){
        query['_id'] = convertToObjectId(getTicketDto.ticket_id)
      }
      if(getTicketDto?.ticket_type_id){
        query['ticket_type'] = convertToObjectId(getTicketDto.ticket_type_id)
      }
      if(getTicketDto?.user_id){
        query['user'] = convertToObjectId(getTicketDto.user_id)
      }
      if(getTicketDto?.status){
        query['status'] = getTicketDto.status
      }
      if(getTicketDto?.search){
        query['description'] = {
          $regex: getTicketDto.search,
          $options: 'i'
        }
      }

      return await this.ticketModel.find(query).populate('ticket_type').populate('user').sort({_id: -1}).limit(getTicketDto.limit).skip(getTicketDto.offset)

    }
    catch(err){
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  async update(id: string, updateTicketInput: UpdateTicketInput) {
    try{
      delete updateTicketInput.id
      await this.ticketModel.findByIdAndUpdate(id, updateTicketInput)
      return await this.ticketModel.findById(id)
    }
    catch(err){
      console.log(err)
      throw err
    }
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
