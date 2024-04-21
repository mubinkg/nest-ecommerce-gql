import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesResolver } from './resolvers/categories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema
      }
    ])
  ],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
