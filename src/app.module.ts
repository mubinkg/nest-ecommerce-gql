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
import { BrandsModule } from './brands/brands.module';
import { RatingsModule } from './ratings/ratings.module';
import { PromoCodeModule } from './promo-code/promo-code.module';
import { FavouritesModule } from './favourites/favourites.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductFaqModule } from './product-faq/product-faq.module';
import { AramicsModule } from './aramics/aramics.module';
import { FaqModule } from './faq/faq.module';
import { SmsModule } from './sms/sms.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      csrfPrevention: false,
      context: ({ req, res }) => ({ req, res }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    TicketsModule,
    ProductsModule,
    AreasModule,
    CitiesModule,
    CustomersModule,
    CategoriesModule,
    AddressesModule,
    SlidersModule,
    BrandsModule,
    RatingsModule,
    PromoCodeModule,
    FavouritesModule,
    CartModule,
    OrdersModule,
    ProductVariantsModule,
    ProductAttributesModule,
    ProductFaqModule,
    AramicsModule,
    FaqModule,
    SmsModule
  ],
})
export class AppModule {}
