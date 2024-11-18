import { Module } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersResolver } from './resolvers/offers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from './entities/offer.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:Offer.name,
        schema: OfferSchema
      }
    ])
  ],
  providers: [OffersResolver, OffersService],
})
export class OffersModule {}
