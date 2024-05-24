import { Module } from '@nestjs/common';
import { DashboardService } from './services/dashboard.service';
import { DashboardResolver } from './resolvers/dashboard.resolver';
import { ProductsModule } from 'src/products/products.module';
import { RatingsModule } from 'src/ratings/ratings.module';
import { CustomersModule } from 'src/customers/customers.module';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports:[
    ProductsModule, RatingsModule,CustomersModule, OrdersModule
  ],
  providers: [DashboardResolver, DashboardService],
})
export class DashboardModule {}
