import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TicketCustomer{
    @Field(()=>String, {nullable:true})
    user_name?: string
}