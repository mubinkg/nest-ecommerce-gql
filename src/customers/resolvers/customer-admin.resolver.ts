import { Query, Resolver, Args } from "@nestjs/graphql";
import { CustomerAdminService } from "../services/customer-admin.service";
import { CustomerAdminDto } from "../dto/customer-admin.dto";

@Resolver(()=>CustomerAdminResolver)
export class CustomerAdminResolver{
    constructor(
        private readonly customerAdminServie:CustomerAdminService
    ){}

    @Query(()=>CustomerAdminDto)
    customerAdminList(
        @Args('query', {type:()=>String}) query:string,
        @Args('limit', {type: ()=>Number}) limit: number,
        @Args('offset', {type: ()=>Number}) offset: number
    ){
        return this.customerAdminServie.getAdminCustomerList(query, limit, offset)
    }
}