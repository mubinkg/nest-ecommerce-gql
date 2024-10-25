import { Module } from '@nestjs/common';
import { AramicsService } from './services/aramics.service';
import { AramicsResolver } from './resolvers/aramics.resolver';
import { CryptoServie } from './services/crypto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryCharge } from 'src/cart/entities/delvary-charge.entity';
import { DeliveryChargeSchema } from './entities/aramic.entity';
import { ProductVariant, ProductVariantSchema } from 'src/product-variants/entities/product-variant.entity';
import { Address, AddressSchema } from 'src/addresses/entities/address.entity';

@Module({
  imports:[MongooseModule.forFeature([
    {
      schema: DeliveryChargeSchema,
      name: DeliveryCharge.name
    },
    {
      schema: ProductVariantSchema,
      name: ProductVariant.name
    },
    {
      schema:AddressSchema,
      name: Address.name
    }
  ])],
  providers: [AramicsResolver, AramicsService, CryptoServie],
})
export class AramicsModule {}
