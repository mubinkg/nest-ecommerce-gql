import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { SchemaTypes } from "mongoose";
import { ProductAttributeValue } from "src/product-attributes/entities/product-attribute-value.entity";
import { ProductAttribute } from "src/product-attributes/entities/product-attribute.entity";

@ObjectType()
@Schema({
    _id:false
})
export class ProductAttributeEntity{
    @Field(()=>ProductAttribute, {nullable:true})
    @Prop({type: SchemaTypes.ObjectId, ref:'ProductAttribute'})
    attribute?:ProductAttribute

    @Field(()=>[ProductAttributeValue], {nullable:true})
    @Prop([{type: SchemaTypes.ObjectId, ref: "ProductAttributeValue"}])
    values?:ProductAttributeValue[]
}

export const ProductAttributeEntitySchema = SchemaFactory.createForClass(ProductAttributeEntity)