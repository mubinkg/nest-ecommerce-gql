import { Args, Mutation, Resolver, Query} from "@nestjs/graphql";
import { TicketType } from "../entities/ticker-type.entity";
import { TicketTypeService } from "../services/ticket-type.service";
import { CereateTicketTypeInput } from "../dto/create-ticket-type.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/customers/jwt-guards";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { AdminTicketTypeResponse } from "../dto/admin-ticket-type-response.dto";

@Resolver('TicketType')
export class TicketTypeResolver{

    constructor(
        private readonly ticketTypeService:TicketTypeService
    ){}

    @Mutation(()=>TicketType)
    @UseGuards(GqlAuthGuard)
    createTicketType(
        @Args('createTicketTypeInput') createTikcetTypeInput:CereateTicketTypeInput,
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

    @Query(()=>AdminTicketTypeResponse)
    getAdminTicketTypes(
        @Args('limit', {type: ()=> Number}) limit:number,
        @Args('offset', {type: ()=> Number}) offset:number
    ){
        return this.ticketTypeService.getAdminTicketTypes(limit, offset)
    }
}