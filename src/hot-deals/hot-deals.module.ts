import { Module } from '@nestjs/common';
import { HotDealsService } from './services/hot-deals.service';
import { HotDealsResolver } from './resolvers/hot-deals.resolver';

@Module({
  providers: [HotDealsResolver, HotDealsService],
})
export class HotDealsModule {}
