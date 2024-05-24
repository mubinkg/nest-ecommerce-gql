import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class DashboardTopContent{
    @Field(()=>Number, {nullable:true, defaultValue: 0})
    totalOrder?: number

    @Field(()=>Number, {nullable:true})
    totalProduct?: number

    @Field(()=>Number, {nullable:true})
    totalRating?: number

    @Field(()=>Number, {nullable:true})
    rating?: number

    @Field(()=>Number, {nullable:true})
    totalBalance?: number
}