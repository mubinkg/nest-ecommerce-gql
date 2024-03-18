import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "../entities/category.entity";

@ObjectType()
export class CategoriesResponse extends Category{
    @Field(()=>[Category],{description: "Children Array are same as category"})
    children? : [Category];
}