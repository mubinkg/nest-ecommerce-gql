import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersResolver } from './sliders.resolver';

@Module({
  providers: [SlidersResolver, SlidersService],
})
export class SlidersModule {}
