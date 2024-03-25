import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersResolver } from './sellers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from './entities/seller.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Seller.name,
        schema: SellerSchema
      }
    ])
  ],
  providers: [SellersResolver, SellersService],
})
export class SellersModule {}
