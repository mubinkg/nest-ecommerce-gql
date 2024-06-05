import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateOrderInput } from '../dto/create-order.input';
import { UpdateOrderInput } from '../dto/update-order.input';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../entities/order.entity';
import { Model } from 'mongoose';
import { ProductVariantsService } from 'src/product-variants/services/product-variants.service';
import { GetOrderDto } from '../dto/get-orders.dto';
import { OrderSortOrder } from '../enum';
import { OrderItem, OrderItemDocument } from '../entities/order-item.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private readonly orderModel:Model<OrderDocument>,
    @InjectModel(OrderItem.name) private readonly orderItemModel:Model<OrderItemDocument>,
    private readonly productVariantsService:ProductVariantsService
  ){}

  async create(createOrderInput: CreateOrderInput, user:any) {
    try{
      await this.productVariantsService.updateProductVarientAfterOrder(createOrderInput)
      const order = await this.orderModel.create({...createOrderInput, user: user.userId, address: createOrderInput.address_id})
      const ordetItemList = []
      createOrderInput.product_variants.forEach((item, i)=>{
        ordetItemList.push({
          quantity: createOrderInput.quantity[i],
          product_variant: item,
          order: order._id.toString()
        })
      })
      await this.orderItemModel.insertMany(ordetItemList)
      return order;
    }
    catch(err){
      throw err
    }
  }

  async findAll(getOrderDto:GetOrderDto) {
    try{
      const query = {}
      const sort = {}
      if(getOrderDto?.user_id){
        query['user_id'] = getOrderDto.user_id
      }
      if(getOrderDto?.active_status){
        query['status'] = getOrderDto.active_status
      }
      if(getOrderDto.sort){
        sort[getOrderDto.sort] = getOrderDto.order === OrderSortOrder.DESC ? -1 : 1
      }

      return await this.orderModel.find(query).sort(sort).limit(getOrderDto.limit).skip(getOrderDto.offset)
    }
    catch(err){
      throw err;
    }
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
