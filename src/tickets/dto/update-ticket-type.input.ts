import { Field, InputType } from "@nestjs/graphql";
import { CereateTicketTypeInput } from "./create-ticket-type.input";
import { IsMongoId, IsString } from "class-validator";

@InputType()
export class UpdateTicketType extends CereateTicketTypeInput{
    @Field(()=>String)
    @IsString()
    @IsMongoId()
    id: string
}