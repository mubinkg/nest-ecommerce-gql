import { Logger, Module } from '@nestjs/common';
import { HotDealsService } from './services/hot-deals.service';
import { HotDealsResolver } from './resolvers/hot-deals.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { HotDeal, HotDealSchema } from './entities/hot-deal.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name : HotDeal.name,
        schema: HotDealSchema
      }
    ]),
  ],
  providers: [HotDealsResolver, HotDealsService],
})
export class HotDealsModule {}
