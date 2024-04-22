import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoriesSliderService } from './services/categories-slider.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ])
  ],
  providers: [CategoriesResolver, CategoriesService, CategoriesSliderService],
  exports: [CategoriesSliderService]
})
export class CategoriesModule {}
