import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "../enum";

registerEnumType(OrderStatus,{
    name: 'OrderStatus'
})

@InputType()
export class GetAdminOrderInput{
    @Field(()=>Date, {nullable:true})
    @IsOptional()
    @IsDate()
    start_date?: Date

    @Field(()=>Date, {nullable:true})
    @IsOptional()
    @IsDate()
    end_date?: Date

    @Field(()=>OrderStatus, {nullable:true})
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus

    @Field(()=>String, {nullable:true})
    @IsOptional()
    @IsString()
    payment_method?:string

    @Field(()=>String, {nullable:true})
    @IsOptional()
    @IsString()
    product_type?:string
}