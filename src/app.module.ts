import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TicketsModule } from './tickets/tickets.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AreasModule } from './areas/areas.module';
import { ConfigModule } from '@nestjs/config';
import { CitiesModule } from './cities/cities.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { AddressesModule } from './addresses/addresses.module';
import { SlidersModule } from './sliders/sliders.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TicketsModule,
    ProductsModule,
    AreasModule,
    CitiesModule,
    CustomersModule,
    CategoriesModule,
    AddressesModule,
    SlidersModule
  ],
})
export class AppModule {}
