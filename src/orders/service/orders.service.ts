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
import { OrderProductVariantServie } from 'src/product-variants/services/order-product-variant.service';
import { convertToObjectId } from 'src/utils/convert-to-objectid';

@Injectable()
export class OrdersService {

  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(OrderItem.name) private readonly orderItemModel: Model<OrderItemDocument>,
    private readonly productVariantsService: ProductVariantsService,
    private readonly orderProductVariantService: OrderProductVariantServie
  ) { }

  async generateOrderId() {
    const date = new Date();
    const year = date.getFullYear() % 100;
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const totalOrder = await this.orderModel.countDocuments({})
    return `K${year}${month}${day}${totalOrder}`
  }

  async create(createOrderInput: CreateOrderInput, user: any) {
    try {
      await this.productVariantsService.updateProductVarientAfterOrder(createOrderInput)
      const orderId = await this.generateOrderId();
      const order = await this.orderModel.create({ ...createOrderInput, user: user.userId, address: createOrderInput.address_id, orderId: orderId })
      const variantData = await this.orderProductVariantService.getVariantListWithQuantity(createOrderInput.product_variants, createOrderInput.quantity);
      await this.orderItemModel.insertMany(variantData)
      return order;
    }
    catch (err) {
      throw err
    }
  }

  async findAll(getOrderDto: GetOrderDto) {
    try {
      const query = {}
      const sort = {}
      if (getOrderDto?.user_id) {
        query['user'] = convertToObjectId(getOrderDto.user_id)
      }
      if (getOrderDto?.active_status) {
        query['status'] = getOrderDto.active_status
      }
      if (getOrderDto.sort) {
        sort[getOrderDto.sort] = getOrderDto.order === OrderSortOrder.DESC ? -1 : 1
      }

      const orders =  await this.orderModel.find(query).sort(sort).populate({ path: 'user', }).populate({
        path: 'product_variants',
        populate: {
          path: 'product',
          populate: {
            path: 'seller'
          }
        }
      }).limit(getOrderDto.limit).skip(getOrderDto.offset)

      console.log('Total order list : ', orders)

      return orders;
    }
    catch (err) {
      throw err;
    }
  }

  async findOne(id: string) {
    try {
      return await this.orderModel.findById(id).populate({ path: "address" }).populate({ path: 'user' })
    }
    catch (err) {
      throw err;
    }
  }

  async update(updateOrderInput: UpdateOrderInput) {
    try {
      await this.orderModel.findByIdAndUpdate(updateOrderInput.order_id, { status: updateOrderInput.status })
      return 'Order status updated'
    }
    catch (err) {
      throw err;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
