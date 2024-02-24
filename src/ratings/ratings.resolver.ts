import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RatingsService } from './ratings.service';
import { Rating } from './entities/rating.entity';
import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { DeleteRatingInput } from './dto/delete-rating.dto';

@Resolver(() => Rating)
export class RatingsResolver {
  constructor(private readonly ratingsService: RatingsService) {}

  @Mutation(() => Rating)
  createRating(@Args('createRatingInput') createRatingInput: CreateRatingInput) {
    return this.ratingsService.create(createRatingInput);
  }

  @Mutation(() => String)
  deleteRating(@Args('deleteRatingInput') deleteRatingInput: DeleteRatingInput) {
    return this.ratingsService.delete(deleteRatingInput);
  }


  
  
  @Query(() => [Rating], { name: 'ratings' })
  getRatings() {
    return this.ratingsService.getRatings();
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
