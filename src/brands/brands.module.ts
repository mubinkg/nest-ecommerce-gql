import { Module } from '@nestjs/common';
import { BrandsService } from './services/brands.service';
import { BrandsResolver } from './resolvers/brands.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './entities/brand.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: BrandSchema,
        name: Brand.name
      }
    ])
  ],
  providers: [BrandsResolver, BrandsService],
})
export class BrandsModule {}
