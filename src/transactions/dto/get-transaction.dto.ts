import { Field, ObjectType } from "@nestjs/graphql";
import { Transaction } from "../entities/transaction.entity";

@ObjectType()
export class GetTransactionListDto{
    @Field(()=>[Transaction], {nullable:true})
    transactionList:Transaction[]

    @Field(()=>Number,{nullable:true})
    count?:number
}