import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './entities/order.entity';
import { Model } from 'mongoose';
import { ProductVariantsService } from 'src/product-variants/product-variants.service';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>,
    private readonly productVariantsService:ProductVariantsService
  ){}

  async create(createOrderInput: CreateOrderInput, user:any) {
    try{
      await this.productVariantsService.updateProductVarientAfterOrder(createOrderInput)
      return await this.orderModel.create({...createOrderInput, user_id: user.userId})
    }
    catch(err){
      throw err
    }
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(updateOrderInput: UpdateOrderInput) {
    try{
      await this.orderModel.findByIdAndUpdate(updateOrderInput.order_id, {status:updateOrderInput.status})
      return 'Order status updated'
    }
    catch(err){
      throw err;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
