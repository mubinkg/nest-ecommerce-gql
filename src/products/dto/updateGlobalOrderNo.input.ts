import { Field, InputType } from "@nestjs/graphql";
import { UpdateProductGlobalOrderNoInputObject } from "./updateProductGlobalOrderNoInputObject";

@InputType()
export class UpdateProductGlobalOrderNoInput{
        @Field(()=>[UpdateProductGlobalOrderNoInputObject])
        productArray:UpdateProductGlobalOrderNoInputObject[]
}