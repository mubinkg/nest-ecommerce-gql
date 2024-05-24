import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "src/categories/entities/category.entity";

@ObjectType()
export class CategoryWiseProduct{
    @Field(()=>Number,{nullable:true})
    count?: number

    @Field(()=>Category, {nullable:true})
    category?:Category
}