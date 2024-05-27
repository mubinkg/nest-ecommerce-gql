import { Field, ObjectType } from "@nestjs/graphql";
import { Section } from "../entities/section.entity";

@ObjectType()
export class AdminSectionDto{
    @Field(()=>[Section], {nullable:true})
    sections?:Section[]

    @Field(()=>Number, {nullable:true})
    count?: number
}