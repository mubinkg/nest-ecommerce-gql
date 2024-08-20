import { Module } from '@nestjs/common';
import { FlashSellService } from './flash-sell.service';
import { FlashSellResolver } from './flash-sell.resolver';

@Module({
  providers: [FlashSellResolver, FlashSellService],
})
export class FlashSellModule {}
