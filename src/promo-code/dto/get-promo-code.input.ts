import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetPromoCodesInput{
    @Field(()=>Number)
    limit:number

    @Field(()=>Number)
    offset:number
}