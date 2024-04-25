import { Resolver } from "@nestjs/graphql";

@Resolver(()=>CustomerAdminResolver)
export class CustomerAdminResolver{
    constructor(){}
}