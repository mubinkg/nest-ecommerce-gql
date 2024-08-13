import { Module } from '@nestjs/common';
import { CartService } from './service/cart.service';
import { CartResolver } from './resolvers/cart.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entities/cart.entity';
import { DeliveryCharge, DeliveryChargeSchema } from './entities/delvary-charge.entity';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cart.name,
        schema: CartSchema
      },
      {
        name: DeliveryCharge.name,
        schema: DeliveryChargeSchema
      }
    ]),
    AddressesModule
  ],
  providers: [CartResolver, CartService],
})
export class CartModule {}
