import { Module } from '@nestjs/common';
import { AddressesService } from './services/addresses.service';
import { AddressesResolver } from './resolvers/addresses.resolver';
import { Address, AddressSchema } from './entities/address.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminAddressResolver } from './resolvers/address-admin.resolver';
import { AdminAddressService } from './services/admin-address.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Address.name,
        schema: AddressSchema
      }
    ])
  ],
  providers: [AddressesResolver, AddressesService, AdminAddressResolver, AdminAddressService],
  exports: [AddressesService]
})
export class AddressesModule {}
