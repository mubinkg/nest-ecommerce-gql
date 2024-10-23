import { Module } from '@nestjs/common';
import { AramicsService } from './services/aramics.service';
import { AramicsResolver } from './resolvers/aramics.resolver';
import { CryptoServie } from './services/crypto.service';

@Module({
  providers: [AramicsResolver, AramicsService, CryptoServie],
})
export class AramicsModule {}
