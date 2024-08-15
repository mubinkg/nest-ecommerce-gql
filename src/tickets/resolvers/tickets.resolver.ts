import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketsService } from '../services/tickets.service';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketInput } from '../dto/create-ticket.input';
import { UpdateTicketInput } from '../dto/update-ticket.input';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { GetTicketsDto } from '../dto/get-ticket.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) {}

  @Mutation(() => Ticket)
  @UseGuards(GqlAuthGuard)
  createTicket(
      @Args('createTicketInput') createTicketInput: CreateTicketInput,
      @CurrentUser('user') user:any
    ) {
    return this.ticketsService.create(createTicketInput, user);
  }

  @Query(() => [Ticket], { name: 'getTickets' })
  findAll(
    @Args('getTicketDto') getTicketDto:GetTicketsDto
  ) {
    return this.ticketsService.findAll(getTicketDto);
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {
    return this.ticketsService.update(updateTicketInput.id, updateTicketInput);
  }

  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketsService.remove(id);
  }
}
