import { Field, ObjectType } from "@nestjs/graphql";
import { Media } from "../entities/media.entity";

@ObjectType()
export class AdminMedia{
    @Field(()=>[Media], {nullable:true})
    media?: Media[]

    @Field(()=>Number, {nullable:true})
    count?: number
}