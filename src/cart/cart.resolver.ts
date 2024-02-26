import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  @UseGuards(GqlAuthGuard)
  createCart(
    @Args('createCartInput') createCartInput: CreateCartInput,
    @CurrentUser() user:any
  ) {
    return this.cartService.create(createCartInput, user);
  }

  @Query(() => [Cart], { name: 'getUserCart' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @CurrentUser() user:any
  ) {
    return this.cartService.findAll(user);
  }

  @Query(() => Cart, { name: 'cart' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.findOne(id);
  }

  @Mutation(() => Cart)
  updateCart(@Args('updateCartInput') updateCartInput: UpdateCartInput) {
    return this.cartService.update(updateCartInput.id, updateCartInput);
  }

  @Mutation(() => Cart)
  removeCart(@Args('id', { type: () => String }) id: string) {
    return this.cartService.remove(id);
  }
}
