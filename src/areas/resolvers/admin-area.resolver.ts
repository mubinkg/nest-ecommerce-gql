import { Args, Resolver, Query } from "@nestjs/graphql";
import { AdminAreaService } from "../services/admin-area.service";
import { AdminAreaDto } from "../dto/admin-area-dto";

@Resolver(()=>AdminAreaResolver)
export class AdminAreaResolver{
    constructor(
        private readonly adminAreaService:AdminAreaService
    ){}

    @Query(()=>AdminAreaDto)
    getAdminArea(
        @Args('limit', {type:()=>Number}) limit:number,
        @Args('offset', {type:()=>Number}) offset:number,
        @Args('query', {type:()=>String}) query:string
    ){
        return this.adminAreaService.getAdminAreaList({limit,offset, query})
    }
}