import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesResolver } from './addresses.resolver';
import { Address, AddressSchema } from './entities/address.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Address.name,
        schema: AddressSchema
      }
    ])
  ],
  providers: [AddressesResolver, AddressesService],
})
export class AddressesModule {}
