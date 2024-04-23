import { InputType } from "@nestjs/graphql";

@InputType()
export class FaqAdminInput{
    product: string
    question: string
    ans: string
}