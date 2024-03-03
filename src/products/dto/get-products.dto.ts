import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductOrder, ProductSort } from "../enum";

registerEnumType(ProductSort, {
    name: 'ProductSort'
})

registerEnumType(ProductOrder, {
    name: "ProductOrder"
})

@InputType()
export class GetProductDto{
    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    id?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    category_id?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    search?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    tags?:string

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    attribute_value_ids?:string

    @Field(()=>Number, {nullable:true})
    @IsNumber()
    @IsOptional()
    limit?:number

    @Field(()=>Number, {nullable:true})
    @IsNumber()
    @IsOptional()
    offset?:number

    @Field(()=>ProductSort, {nullable:true, defaultValue:ProductSort.ID})
    @IsOptional()
    @IsEnum(ProductSort)
    sort?: ProductSort

    @Field(()=>ProductOrder, {nullable:true, defaultValue:ProductOrder.DESC})
    @IsOptional()
    @IsEnum(ProductOrder)
    order?:ProductOrder

    @Field(()=>Number, {nullable:true})
    @IsNumber()
    @IsOptional()
    min_price?:number

    @Field(()=>Number, {nullable:true})
    @IsNumber()
    @IsOptional()
    max_price?:number

    @Field(()=>String, {nullable:true})
    @IsString()
    @IsOptional()
    seller_id?:string
}