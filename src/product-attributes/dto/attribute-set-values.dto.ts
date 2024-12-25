import { Field, ObjectType } from "@nestjs/graphql";
import { ProductAttributeValueType } from "../enum/attribute-value-type.enum";

@ObjectType()
export class AttributeSetValuesDto{
    @Field(()=>String)
    _id: string

    @Field(()=>String)
    attributeSetName:string
    
    @Field(()=>[AttirbuteSetValue], {nullable:true})
    attributeSetValues?: AttirbuteSetValue[]
}

@ObjectType()
class AttirbuteSetValue{
    @Field(()=>String, {nullable:true})
    _id?: string

    @Field(()=>ProductAttributeValueType,{nullable:true})
    type?:ProductAttributeValueType

    @Field(()=>String, {nullable:true})
    valueName?: string
}