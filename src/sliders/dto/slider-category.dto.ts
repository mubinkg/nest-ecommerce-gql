import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SliderCategory{
    @Field(()=>String, {nullable: true})
    _id?:string

    @Field(()=>String, {nullable:true})
    name?:string
}