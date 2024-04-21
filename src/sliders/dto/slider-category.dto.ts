import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SliderProduct{
    @Field(()=>String, {nullable: true})
    _id?:string

    @Field(()=>String, {nullable:true})
    pro_input_name?:string
}