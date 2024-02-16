import { Module } from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasResolver } from './areas.resolver';

@Module({
  providers: [AreasResolver, AreasService],
})
export class AreasModule {}
