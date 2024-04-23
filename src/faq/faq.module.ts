import { Module } from '@nestjs/common';
import { FaqService } from './services/faq.service';
import { FaqResolver } from './resolvers/faq.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Faq } from './entities/faq.entity';
import { FaqSchema } from './dto/create-faq.input';
import { FaqAdminService } from './services/faq-admin.service';
import { FaqAdminResolver } from './resolvers/faq-admin.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Faq.name,
        schema: FaqSchema
      }
    ])
  ],
  providers: [FaqResolver, FaqService, FaqAdminService, FaqAdminResolver],
})
export class FaqModule {}
