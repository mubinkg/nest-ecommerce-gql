import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { GetOrderDto } from './dto/get-orders.dto';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Order)
  createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @CurrentUser() user:any
  ) {
    return this.ordersService.create(createOrderInput, user);
  }

  @Query(() => [Order], { name: 'get_orders' })
  findAll(
    @Args('getOrderDto') getOrderDto:GetOrderDto
  ) {
    return this.ordersService.findAll(getOrderDto);
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.findOne(id);
  }

  @Mutation(() => String)
  updateOrderStatus(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.ordersService.update(updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => Int }) id: number) {
    return this.ordersService.remove(id);
  }
}
