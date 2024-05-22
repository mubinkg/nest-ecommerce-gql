import { Module } from '@nestjs/common';
import { RatingsService } from './services/ratings.service';
import { RatingsResolver } from './resolvers/ratings.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './entities/rating.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rating.name,
        schema: RatingSchema
      }
    ])
  ],
  providers: [RatingsResolver, RatingsService],
})
export class RatingsModule {}
