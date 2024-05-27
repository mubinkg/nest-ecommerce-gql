import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StatusWiseOrderCountDto{
    @Field(()=>String, {nullable:true})
    _id:string

    @Field(()=>Number, {nullable:true})
    statusCount:number
}