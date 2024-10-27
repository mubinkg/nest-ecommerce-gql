import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RatingsService } from '../services/ratings.service';
import { Rating } from '../entities/rating.entity';
import { CreateRatingInput } from '../dto/create-rating.input';
import { UpdateRatingInput } from '../dto/update-rating.input';
import { DeleteRatingInput } from '../dto/delete-rating.dto';
import { RatingFilterDto } from '../dto/ratings.filter.dto';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Rating)
export class RatingsResolver {
  constructor(private readonly ratingsService: RatingsService) {}

  @Mutation(() => Rating)
  @UseGuards(GqlAuthGuard)
  createRating(@Args('createRatingInput') createRatingInput: CreateRatingInput,
  @CurrentUser("user") user:any) {
    const {userId} = user;
    createRatingInput.user_id = userId
    
    return this.ratingsService.create(createRatingInput);
  }

  @Mutation(() => String)
  deleteRating(@Args('id') id: string) {
    return this.ratingsService.delete(id);
  }

  @Query(() => [Rating], { name: 'ratings' })
  getRatings(@Args("ratingFilterDto") ratingFilterDto : RatingFilterDto) {
    return this.ratingsService.getRatings(ratingFilterDto);
  }

  @Query(() => Rating, { name: 'rating' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ratingsService.findOne(id);
  }

  @Mutation(() => Rating)
  updateRating(@Args('updateRatingInput') updateRatingInput: UpdateRatingInput) {
    return this.ratingsService.update(updateRatingInput.id, updateRatingInput);
  }

  @Mutation(() => Rating)
  removeRating(@Args('id', { type: () => Int }) id: number) {
    return this.ratingsService.remove(id);
  }
}
