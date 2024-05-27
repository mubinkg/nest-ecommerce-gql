import { Module } from '@nestjs/common';
import { SectionsService } from './services/sections.service';
import { SectionsResolver } from './resolvers/sections.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './entities/section.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Section.name,
        schema: SectionSchema
      }
    ])
  ],
  providers: [SectionsResolver, SectionsService],
})
export class SectionsModule {}
