import { Field, InputType } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

@InputType()
export class ImageInput{
    @Field(()=> GraphQLUpload, {nullable: true})
    image?: FileUpload | string
}