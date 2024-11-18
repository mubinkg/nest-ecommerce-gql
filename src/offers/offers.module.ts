import { Module } from '@nestjs/common';
import { OffersService } from './services/offers.service';
import { OffersResolver } from './resolvers/offers.resolver';

@Module({
  providers: [OffersResolver, OffersService],
})
export class OffersModule {}
