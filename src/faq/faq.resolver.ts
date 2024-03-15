import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FaqService } from './faq.service';
import { Faq } from './entities/faq.entity';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver(() => Faq)
export class FaqResolver {
  constructor(private readonly faqService: FaqService) {}

  @Mutation(() => Faq)
  @UseGuards(GqlAuthGuard)
  createFaq(
    @Args('createFaqInput') createFaqInput: CreateFaqInput,
    @CurrentUser('user') user:any
  ) {
    return this.faqService.create(createFaqInput, user);
  }

  @Query(() => [Faq], { name: 'faq' })
  findAll() {
    return this.faqService.findAll();
  }

  @Query(() => Faq, { name: 'faq' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.faqService.findOne(id);
  }

  @Mutation(() => Faq)
  updateFaq(@Args('updateFaqInput') updateFaqInput: UpdateFaqInput) {
    return this.faqService.update(updateFaqInput.id, updateFaqInput);
  }

  @Mutation(() => Faq)
  removeFaq(@Args('id', { type: () => Int }) id: number) {
    return this.faqService.remove(id);
  }
}
