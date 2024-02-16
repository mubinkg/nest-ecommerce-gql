import { Args, Mutation, Resolver, Query} from "@nestjs/graphql";
import { TicketType } from "./entities/ticker-type.entity";
import { TicketTypeService } from "./ticket-type.service";
import { CereateTicketTypeInput } from "./dto/create-ticket-type.input";

@Resolver('TicketType')
export class TicketTypeResolver{

    constructor(
        private readonly ticketTypeService:TicketTypeService
    ){}

    @Mutation(()=>TicketType)
    createTicketType(
        @Args('createTicketTypeInput') createTikcetTypeInput:CereateTicketTypeInput
    ){
        return this.ticketTypeService.createTicketType(createTikcetTypeInput)
    }

    @Query(()=>[TicketType])
    getTicketTypes(
        @Args('limit', {type: ()=> Number}) limit:number,
        @Args('offset', {type: ()=> Number}) offset:number
    ){
        return this.ticketTypeService.getTicketTypes(limit, offset)
    }
}