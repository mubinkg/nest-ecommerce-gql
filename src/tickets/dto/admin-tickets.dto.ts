import { Field, ObjectType } from "@nestjs/graphql";
import { Ticket } from "../entities/ticket.entity";

@ObjectType()
export class AdminTicketsDto{
    @Field(()=>[Ticket], {nullable:true})
    tickets?: Ticket[]

    @Field(()=>Number, {nullable:true})
    count: number
}