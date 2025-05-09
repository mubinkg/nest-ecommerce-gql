import { Module } from '@nestjs/common';
import { TicketsService } from './services/tickets.service';
import { TicketsResolver } from './resolvers/tickets.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketType, TicketTypeSchema } from './entities/ticker-type.entity';
import { TicketTypeResolver } from './resolvers/ticket-type.resolver';
import { TicketTypeService } from './services/ticket-type.service';
import { Ticket, TicketSchema } from './entities/ticket.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TicketType.name, schema: TicketTypeSchema
      },
      {
        name: Ticket.name, schema: TicketSchema
      }
    ])
  ],
  providers: [TicketsResolver, TicketsService, TicketTypeResolver, TicketTypeService],
})
export class TicketsModule {}
