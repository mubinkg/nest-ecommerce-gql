import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FavouritesService } from './favourites.service';
import { Favourite } from './entities/favourite.entity';
import { CreateFavouriteInput } from './dto/create-favourite.input';
import { UpdateFavouriteInput } from './dto/update-favourite.input';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';

@Resolver(() => Favourite)
export class FavouritesResolver {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Mutation(() => Favourite)
  @UseGuards(GqlAuthGuard)
  createFavourite(@Args('createFavouriteInput') createFavouriteInput: CreateFavouriteInput,
  @CurrentUser('user') user:any) {
    const {userId} = user;
    createFavouriteInput.user_Id = userId
    return this.favouritesService.create(createFavouriteInput);
  }

  @Query(() => [Favourite], { name: 'favourites' })
  findAll() {
    return this.favouritesService.findAll();
  }

  @Query(() => Favourite, { name: 'favourite' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.favouritesService.findOne(id);
  }

  @Mutation(() => Favourite)
  updateFavourite(@Args('updateFavouriteInput') updateFavouriteInput: UpdateFavouriteInput) {
    return this.favouritesService.update(updateFavouriteInput.id, updateFavouriteInput);
  }

  @Mutation(() => String)
  removeFavourite(@Args('id', { type: () => String }) id: string) {
    return this.favouritesService.remove(id);
  }
}
