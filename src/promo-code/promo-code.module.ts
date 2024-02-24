import { Module } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeResolver } from './promo-code.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PromoCode, PromoCodeSchema } from './entities/promo-code.entity';

@Module({
  imports:[MongooseModule.forFeature([
    {
      schema: PromoCodeSchema,
      name: PromoCode.name
    }
  ])],
  providers: [PromoCodeResolver, PromoCodeService],
})
export class PromoCodeModule {}
