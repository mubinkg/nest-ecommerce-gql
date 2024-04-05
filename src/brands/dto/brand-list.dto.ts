import { Field, ObjectType } from "@nestjs/graphql";
import { Brand } from "../entities/brand.entity";

@ObjectType()
export class BrandList{
    @Field(()=>[Brand],{nullable:true})
    brands?:Brand[]

    @Field(()=>Number, {nullable:true})
    total?: number
}