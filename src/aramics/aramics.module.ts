import { Module } from '@nestjs/common';
import { AramicsService } from './aramics.service';
import { AramicsResolver } from './aramics.resolver';
import { CryptoServie } from './crypto.service';

@Module({
  providers: [AramicsResolver, AramicsService, CryptoServie],
})
export class AramicsModule {}
