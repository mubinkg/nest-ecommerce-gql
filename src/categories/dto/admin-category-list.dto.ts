import { Field, ObjectType } from "@nestjs/graphql";
import { CategoriesResponse } from "./categories.response.dto";

@ObjectType()
export class AdminCategoryList{
    @Field(()=>[CategoriesResponse])
    categories?: CategoriesResponse[]

    @Field(()=>Number)
    count?: number
}