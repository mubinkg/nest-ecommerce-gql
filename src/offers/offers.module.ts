import { Module } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersResolver } from './resolvers/offers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from './entities/offer.entity';
import { Product, ProductSchema } from 'src/products/entities/product.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Offer.name,
        schema: OfferSchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      }
    ])
  ],
  providers: [OffersResolver, OffersService],
})
export class OffersModule {}
