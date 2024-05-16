import { Field, ObjectType } from "@nestjs/graphql";
import { City } from "../entities/city.entity";

@ObjectType()
export class AdminCities{
    @Field(()=>[City], {nullable:true})
    cities?: City[]

    @Field(()=>Number, {nullable:true})
    count?:number
}