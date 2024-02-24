import { registerEnumType } from "@nestjs/graphql";


export enum ActiveStatus{
    ACTIVE='Active',
    INACTIVE='Inactive'
}


registerEnumType(ActiveStatus,{
    name:'ActiveStatus'
})