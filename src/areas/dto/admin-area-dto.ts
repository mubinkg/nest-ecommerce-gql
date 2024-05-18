import { Field, ObjectType } from "@nestjs/graphql";
import { Area } from "../entities/area.entity";

@ObjectType()
export class AdminAreaDto{
    @Field(()=>[Area], {nullable:true})
    areas:Area[]

    @Field(()=>Number, {nullable:true})
    count?: number
}