import { Module } from '@nestjs/common';
import { FavouritesService } from './services/favourites.service';
import { FavouritesResolver } from './resolvers/favourites.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Favourite, FavouriteSchema } from './entities/favourite.entity';
import { FavoriteProductService } from './services/favorite.product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Favourite.name,
        schema: FavouriteSchema
      }
    ])
  ],
  providers: [FavouritesResolver, FavouritesService, FavoriteProductService],
  exports: [FavoriteProductService]
})
export class FavouritesModule {}
