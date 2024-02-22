import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsResolver } from './brands.resolver';
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
