import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FaqService } from '../services/faq.service';
import { Faq } from '../entities/faq.entity';
import { CreateFaqInput } from '../dto/create-faq.input';
import { UpdateFaqInput } from '../dto/update-faq.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { GetFaqInput } from '../dto/get-faq-input';

@Resolver(() => Faq)
export class FaqResolver {
  constructor(private readonly faqService: FaqService) {}

  @Mutation(() => Faq)
  createFaq(
    @Args('createFaqInput') createFaqInput: CreateFaqInput,
  ) {
    return this.faqService.create(createFaqInput);
  }

  @Query(() => [Faq], { name: 'faq' })
  findAll(
    @Args('getFaqInput') getFaqInput:GetFaqInput
  ) {
    return this.faqService.findAll(getFaqInput);
  }

  // @Query(() => Faq, { name: 'faq' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.faqService.findOne(id);
  // }

  // @Mutation(() => Faq)
  // updateFaq(@Args('updateFaqInput') updateFaqInput: UpdateFaqInput) {
  //   return this.faqService.update(updateFaqInput.id, updateFaqInput);
  // }

  // @Mutation(() => Faq)
  // removeFaq(@Args('id', { type: () => Int }) id: number) {
  //   return this.faqService.remove(id);
  // }
}
