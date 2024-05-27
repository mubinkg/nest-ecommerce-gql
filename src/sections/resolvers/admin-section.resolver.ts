import { Resolver , Query, Args} from "@nestjs/graphql";
import { AdminSectionService } from "../services/admin-section.service";
import { AdminSectionDto } from "../dto/get-sections.dto";

@Resolver(()=>AdminSectionResolver)
export class AdminSectionResolver{
    constructor(
        private readonly adminSectionService:AdminSectionService
    ){}

    @Query(()=>AdminSectionDto, {nullable:true})
    getAdminSetions(
        @Args('limit', {type: ()=>Number}) limit:number,
        @Args('offset', {type: ()=>Number}) offset:number,
        @Args('query', {type: ()=>String}) query:string
    ){
        return this.adminSectionService.getSetions(query, limit, offset)
    }
}