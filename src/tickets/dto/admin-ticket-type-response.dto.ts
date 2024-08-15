import { Field, ObjectType } from "@nestjs/graphql";
import { TicketType } from "../entities/ticker-type.entity";

@ObjectType()
export class AdminTicketTypeResponse{
    @Field(()=>[TicketType], {nullable:true})
    ticketTypes: TicketType[]

    @Field(()=>Number, {nullable:true})
    count?: number
}