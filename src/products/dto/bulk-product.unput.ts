import { Field, InputType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class BulkProductInput{
    @Field(()=>GraphQLUpload, {nullable:true})
    productFile:FileUpload
}