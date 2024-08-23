import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SectionsService } from '../services/sections.service';
import { Section } from '../entities/section.entity';
import { CreateSectionInput } from '../dto/create-section.input';
import { GetSectionsInput } from '../dto/get-sections.input';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';

@Resolver(() => Section)
export class SectionsResolver {
  constructor(private readonly sectionsService: SectionsService) {}

  @Mutation(() => Section)
  createSection(@Args('createSectionInput') createSectionInput: CreateSectionInput) {
    return this.sectionsService.create(createSectionInput);
  }

  @Query(() => [Section], { name: 'getSections' })
  @UseGuards(GqlAuthGuard)
  findAll(
    @Args('getSectionInput') getSectionInput:GetSectionsInput,
    @CurrentUser('user') user:any
  ) {
    return this.sectionsService.findAll(getSectionInput, user);
  }

  @Query(() => [Section], { name: 'sectionForWeb' })
  sectionForWeb(
    @Args('getSectionInput') getSectionInput:GetSectionsInput,
  ) {
    return this.sectionsService.sectionForWeb(getSectionInput);
  }

  // @Query(() => Section, { name: 'section' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.sectionsService.findOne(id);
  // }

  // @Mutation(() => Section)
  // updateSection(@Args('updateSectionInput') updateSectionInput: UpdateSectionInput) {
  //   return this.sectionsService.update(updateSectionInput.id, updateSectionInput);
  // }

  // @Mutation(() => Section)
  // removeSection(@Args('id', { type: () => Int }) id: number) {
  //   return this.sectionsService.remove(id);
  // }
}
