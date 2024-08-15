import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferResolver } from './resolvers/offer.resolver';

@Module({
  providers: [OfferResolver, OfferService],
})
export class OfferModule {}
