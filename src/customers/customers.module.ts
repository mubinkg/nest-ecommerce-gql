import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema
      }
    ]),
    JwtModule.register({
      secret: "secret",
      global: true,
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],
  providers: [CustomersResolver, CustomersService],
})
export class CustomersModule {}
