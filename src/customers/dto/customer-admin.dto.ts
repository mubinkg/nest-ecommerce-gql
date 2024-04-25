import { Field, ObjectType } from "@nestjs/graphql";
import { Customer } from "../entities/customer.entity";

@ObjectType()
export class CustomerAdminDto{
    @Field(()=>[Customer], {nullable:true})
    customers?: Customer[]

    @Field(()=>Number, {nullable:true})
    count?: number
}