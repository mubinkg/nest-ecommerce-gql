import { Args, Mutation, Resolver, Query} from "@nestjs/graphql";
import { TicketType } from "./entities/ticker-type.entity";
import { TicketTypeService } from "./ticket-type.service";
import { CereateTicketTypeInput } from "./dto/create-ticket-type.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/customers/jwt-guards";
import { CurrentUser } from "src/decorator/current-user.decorator";

@Resolver('TicketType')
export class TicketTypeResolver{

    constructor(
        private readonly ticketTypeService:TicketTypeService
    ){}

    @Mutation(()=>TicketType)
    @UseGuards(GqlAuthGuard)
    createTicketType(
        @Args('createTicketTypeInput') createTikcetTypeInput:CereateTicketTypeInput,
        @CurrentUser('user') user:any
    ){
        return this.ticketTypeService.createTicketType(createTikcetTypeInput, user)
    }

    @Query(()=>[TicketType])
    getTicketTypes(
        @Args('limit', {type: ()=> Number}) limit:number,
        @Args('offset', {type: ()=> Number}) offset:number
    ){
        return this.ticketTypeService.getTicketTypes(limit, offset)
    }
}