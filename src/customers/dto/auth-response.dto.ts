import { Field, ObjectType } from "@nestjs/graphql";
import { Customer } from "../entities/customer.entity";

@ObjectType()
export class AuthResponseDto{
    @Field(()=>String)
    access_token?: string

    @Field(()=>Customer, {nullable:true})
    customer?: Customer
}