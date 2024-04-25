import { Resolver } from "@nestjs/graphql";

@Resolver(()=>AdminAddressResolver)
export class AdminAddressResolver{
    constructor(){}
}