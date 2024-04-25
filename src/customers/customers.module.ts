import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { CustomersResolver } from './resolvers/customers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport.strategy';
import { GqlAuthGuard } from './jwt-guards';

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
    }),
    PassportModule
  ],
  providers: [CustomersResolver, CustomersService,JwtStrategy, GqlAuthGuard],
})
export class CustomersModule {}
