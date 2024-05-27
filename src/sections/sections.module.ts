import { Module } from '@nestjs/common';
import { SectionsService } from './services/sections.service';
import { SectionsResolver } from './resolvers/sections.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './entities/section.entity';
import { AdminSectionResolver } from './resolvers/admin-section.resolver';
import { AdminSectionService } from './services/admin-section.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Section.name,
        schema: SectionSchema
      }
    ])
  ],
  providers: [SectionsResolver, SectionsService, AdminSectionResolver, AdminSectionService],
})
export class SectionsModule {}
