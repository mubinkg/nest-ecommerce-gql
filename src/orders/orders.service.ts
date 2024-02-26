import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>
  ){}

  async create(createOrderInput: CreateOrderInput, user:any) {
    try{
      return await this.orderModel.create({...createOrderInput, user_id: user.userId})
    }
    catch(err){
      throw new NotImplementedException('Can not create order.')
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
