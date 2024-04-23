import { Field, ObjectType } from "@nestjs/graphql";
import { Faq } from "../entities/faq.entity";

@ObjectType()
export class FaqAdminDto{
    @Field(()=>[Faq], {nullable:true})
    faqs?: Faq[]

    @Field(()=>Number, {nullable:true})
    count?: number
}