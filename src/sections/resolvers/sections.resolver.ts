import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SectionsService } from '../services/sections.service';
import { Section } from '../entities/section.entity';
import { CreateSectionInput } from '../dto/create-section.input';
import { GetSectionsInput } from '../dto/get-sections.input';

@Resolver(() => Section)
export class SectionsResolver {
  constructor(private readonly sectionsService: SectionsService) {}

  @Mutation(() => Section)
  createSection(@Args('createSectionInput') createSectionInput: CreateSectionInput) {
    return this.sectionsService.create(createSectionInput);
  }

  @Query(() => [Section], { name: 'getSections' })
  findAll(
    @Args('getSectionInput') getSectionInput:GetSectionsInput
  ) {
    return this.sectionsService.findAll(getSectionInput);
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
