import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class DeliveryCharge {
    @Field(() => [String])
    @IsArray()
    product_variants: string[]

    @Field(() => [Number])
    @IsArray()
    quantity?: number[]

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    address_id?: string
}