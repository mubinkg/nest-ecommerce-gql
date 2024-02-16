import { Module } from '@nestjs/common';
import { CoustomersService } from './coustomers.service';
import { CoustomersResolver } from './coustomers.resolver';

@Module({
  providers: [CoustomersResolver, CoustomersService],
})
export class CoustomersModule {}
