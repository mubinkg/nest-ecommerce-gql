import { registerEnumType } from "@nestjs/graphql";

export enum ProductAttributeValueType{
    DEFAULT='Default',
    COLOR='Color',
    IMAGE='Image'
}

registerEnumType(ProductAttributeValueType,{name:'ProductAttributeValueType'})