import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { TicketTypeEnum } from "../enum/ticket-type.enum"

@InputType()
export class GetTicketsDto{
    @Field(()=>String, {nullable:true})
    @IsString()
    @IsMongoId()
    @IsOptional()
    ticket_id?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsMongoId()
    @IsOptional()
    ticket_type_id?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsMongoId()
    @IsOptional()
    user_id?:string

    @Field(()=>TicketTypeEnum, {nullable:true})
    @IsEnum(TicketTypeEnum)
    @IsOptional()
    status?: TicketTypeEnum

    @Field(()=>String, {nullable:true})
    search?: string

    @Field(()=>Number)
    @IsNumber()
    @IsNotEmpty()
    limit:number

    @Field(()=>Number)
    @IsNumber()
    @IsNotEmpty()
    offset:number

    @Field(()=>String, {nullable:true})
    sort?: string

    @Field(()=>String, {nullable:true})
    order:string
}