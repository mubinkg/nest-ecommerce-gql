import { Module } from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { OrdersResolver } from './resolvers/orders.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';
import { OrderAdminResolver } from './resolvers/admin-order.resolver';
import { OrderAdminService } from './service/admin-order.service';
import { OrderDashboardServie } from './service/order-dashboard.service';

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
  providers: [OrdersResolver, OrdersService, OrderAdminResolver, OrderAdminService, OrderDashboardServie],
  exports: [OrderDashboardServie]
})
export class OrdersModule {}
