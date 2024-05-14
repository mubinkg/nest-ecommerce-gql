import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MediaService } from '../services/media.service';
import { Media } from '../entities/media.entity';
import { CreateMediaInput } from '../dto/create-media.input';
import { UpdateMediaInput } from '../dto/update-media.input';
import { AdminMedia } from '../dto/admin-media.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';

@Resolver(() => Media)
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Media)
  createMedia(@Args('createMediaInput') createMediaInput: CreateMediaInput) {
    return this.mediaService.create(createMediaInput);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => AdminMedia, { name: 'adminMedia' })
  findAll() {
    return this.mediaService.findAll();
  }

  @Query(() => Media, { name: 'media' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mediaService.findOne(id);
  }

  @Mutation(() => Media)
  updateMedia(@Args('updateMediaInput') updateMediaInput: UpdateMediaInput) {
    return this.mediaService.update(updateMediaInput.id, updateMediaInput);
  }

  @Mutation(() => Media)
  removeMedia(@Args('id', { type: () => String }) id: string) {
    return this.mediaService.remove(id);
  }
}
