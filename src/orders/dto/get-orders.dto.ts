import { Field, InputType, registerEnumType } from "@nestjs/graphql"
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator"
import { OrderSortBy, OrderSortOrder, OrderStatus } from "../enum/index"

registerEnumType(OrderStatus, {
    name: "OrderStatus"
})

registerEnumType(OrderSortBy, {
    name: "OrderSortBy"
})

registerEnumType(OrderSortOrder, {
    name: "OrderSortOrder"
})

@InputType()
export class GetOrderDto{

    @Field(()=>String)
    @IsString()
    user_id:string

    @Field(()=>OrderStatus, {nullable:true})
    @IsOptional()
    @IsEnum(OrderStatus)
    active_status?:OrderStatus // {received,delivered,cancelled,processed} optional

    @Field(()=>Number, {nullable:true, defaultValue: 25})
    @IsOptional()
    @IsNumber()
    limit?:number   

    @Field(()=>Number, {nullable:true, defaultValue: 0})
    @IsOptional()
    @IsNumber()
    offset?:number // { default - 0 } optional

    @Field(()=>OrderSortBy, {defaultValue:OrderSortBy.ID, nullable:true})
    @IsOptional()
    @IsEnum(OrderSortBy)
    sort?: OrderSortBy

    // sort: id / date_added // { default - id } optional
    @Field(()=>OrderSortOrder, {defaultValue: OrderSortOrder.DESC, nullable:true})
    @IsOptional()
    @IsEnum(OrderSortOrder)
    order:OrderSortOrder
    // DESC/ASC // { default - DESC } optional

    @Field(()=>Number, {nullable:true})
    @IsOptional()
    @IsNumber()
    download_invoice?:number // { default - 0 } optional
}