import { Args, Query, Resolver } from "@nestjs/graphql";
import { AdminCitiesService } from "../services/admin-cities.service";
import { AdminCities } from "../dto/admin-city.dto";

@Resolver(()=>AdminCitiesResolver)
export class AdminCitiesResolver{
    constructor(
        private readonly adminCitiesSerivce:AdminCitiesService
    ){}

    @Query(()=>AdminCities)
    adminCityList(
        @Args('limit', {type:()=>Number}) limit:number,
        @Args('offset', {type:()=>Number}) offset:number,
        @Args('query', {type:()=>String}) query:string
    ){
        return this.adminCitiesSerivce.adminCityList({limit,offset,query})
    }
}