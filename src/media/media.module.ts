import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { MediaResolver } from './resolvers/media.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './entities/media.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Media.name,
        schema: MediaSchema
      }
    ])
  ],
  providers: [MediaResolver, MediaService],
})
export class MediaModule {}
