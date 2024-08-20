import { Module } from '@nestjs/common';
import { FlashSellService } from './services/flash-sell.service';
import { FlashSellResolver } from './resolvers/flash-sell.resolver';

@Module({
  providers: [FlashSellResolver, FlashSellService],
})
export class FlashSellModule {}
