import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';
import { OrderAdminResolver } from './resolvers/admin-order.resolver';
import { OrderAdminService } from './service/admin-order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      }
    ]),
    ProductVariantsModule
  ],
  providers: [OrdersResolver, OrdersService, OrderAdminResolver, OrderAdminService],
})
export class OrdersModule {}
