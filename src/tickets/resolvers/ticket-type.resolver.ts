import { Args, Mutation, Resolver, Query} from "@nestjs/graphql";
import { TicketType } from "../entities/ticker-type.entity";
import { TicketTypeService } from "../services/ticket-type.service";
import { CereateTicketTypeInput } from "../dto/create-ticket-type.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/customers/jwt-guards";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { AdminTicketTypeResponse } from "../dto/admin-ticket-type-response.dto";
import { UpdateTicketType } from "../dto/update-ticket-type.input";

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

    @Mutation(()=>TicketType)
    @UseGuards(GqlAuthGuard)
    updateTicketType(
        @Args('updateTicketTypeInput') updateTikcetTypeInput:UpdateTicketType,
    ){
        return this.ticketTypeService.updateTicketType(updateTikcetTypeInput)
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

    @Mutation(()=>TicketType)
    @UseGuards(GqlAuthGuard)
    deleteTicketType(
        @Args('id', {type: ()=> String}) id:string,
    ){
        return this.ticketTypeService.deleteTicketType(id)
    }
}