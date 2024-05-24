import { Module } from '@nestjs/common';
import { RatingsService } from './services/ratings.service';
import { RatingsResolver } from './resolvers/ratings.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Rating, RatingSchema } from './entities/rating.entity';
import { DashboardRatingService } from './services/dashboard-rating.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rating.name,
        schema: RatingSchema
      }
    ])
  ],
  providers: [RatingsResolver, RatingsService,DashboardRatingService],
  exports: [DashboardRatingService]
})
export class RatingsModule {}
