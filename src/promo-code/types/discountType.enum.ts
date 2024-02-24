import { registerEnumType } from "@nestjs/graphql";

export enum DiscountType{
    PERCENTAGE='Percentage',
    AMOUNT='Amount'
}


registerEnumType(DiscountType,{
    name:'DiscountType'
})