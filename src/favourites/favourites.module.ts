import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesResolver } from './favourites.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Favourite, FavouriteSchema } from './entities/favourite.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Favourite.name,
        schema: FavouriteSchema
      }
    ])
  ],
  providers: [FavouritesResolver, FavouritesService],
})
export class FavouritesModule {}
