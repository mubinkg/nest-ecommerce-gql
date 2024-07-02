import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";
import { ProductAttributeValue } from "src/product-attributes/entities/product-attribute-value.entity";
import { ProductAttribute } from "src/product-attributes/entities/product-attribute.entity";
import { Product } from "./product.entity";

@ObjectType()
@Schema({
    timestamps: true
})
export class Attribute{

    @Field(()=>String)
    _id: string

    @Field(()=>Product, {nullable:true})
    @Prop({type: SchemaTypes.ObjectId, ref: "Product"})
    product: Product

    @Field(()=>ProductAttribute, {nullable:true})
    @Prop({type: SchemaTypes.ObjectId, ref:'ProductAttribute'})
    attribute?:ProductAttribute

    @Field(()=>[ProductAttributeValue], {nullable:true})
    @Prop([{type: SchemaTypes.ObjectId, ref: "ProductAttributeValue"}])
    values?:ProductAttributeValue[]
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute)
export type AttributeDocument = HydratedDocument<Attribute>