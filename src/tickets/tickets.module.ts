import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketType, TicketTypeSchema } from './entities/ticker-type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TicketType.name, schema: TicketTypeSchema
      }
    ])
  ],
  providers: [TicketsResolver, TicketsService],
})
export class TicketsModule {}
