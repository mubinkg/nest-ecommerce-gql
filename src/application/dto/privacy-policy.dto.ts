import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PrivacyPolicy{
    @Field(()=>String)
    title:string

    @Field(()=>String)
    body:string
}