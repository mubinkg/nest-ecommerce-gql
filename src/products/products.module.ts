import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductTax, ProductTaxSchema } from './entities/product-tax.entity';
import { ProductTaxService } from './services/product-tax.service';
import { ProductVariantsModule } from 'src/product-variants/product-variants.module';
import { ProductAdminResolver } from './resolvers/product-admin.resolver';
import { ProductAdminService } from './services/product-admin.service';
import { ProductSliderService } from './services/product-slider.service';
import { Attribute, AttributeSchema } from './entities/product-attribute.entity';
import { ProductDashboardServic } from './services/product-dahsboard.service';
import { FavouritesModule } from 'src/favourites/favourites.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Product.name, schema: ProductSchema
        },
        {
          name: ProductTax.name, schema: ProductTaxSchema
        },
        {
          name: Attribute.name, schema: AttributeSchema
        }
      ]
    ),
    ProductVariantsModule,
    FavouritesModule
  ],
  providers: [ProductsResolver, ProductsService, ProductTaxService, ProductAdminResolver, ProductAdminService, ProductSliderService, ProductDashboardServic],
  exports: [ProductSliderService, ProductDashboardServic]
})
export class ProductsModule {}
