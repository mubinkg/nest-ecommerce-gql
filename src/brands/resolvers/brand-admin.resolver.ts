import { Resolver } from "@nestjs/graphql";
import { BrandAdminService } from "../services/brand-admin.service";

@Resolver(()=>BrandAdminResolver)
export class BrandAdminResolver{
    constructor(
        private readonly brandAdminService:BrandAdminService
    ){}
}