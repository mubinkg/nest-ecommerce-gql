import { Resolver } from "@nestjs/graphql";

@Resolver(()=>FaqAdminResolver)
export class FaqAdminResolver{
    constructor(){}
}