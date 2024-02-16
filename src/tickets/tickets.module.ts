import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketType, TicketTypeSchema } from './entities/ticker-type.entity';
import { TicketTypeResolver } from './ticket-type.resolver';
import { TicketTypeService } from './ticket-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TicketType.name, schema: TicketTypeSchema
      }
    ])
  ],
  providers: [TicketsResolver, TicketsService, TicketTypeResolver, TicketTypeService],
})
export class TicketsModule {}
