import { Field, ObjectType } from "@nestjs/graphql";

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

    @Field(()=>String, {nullable:true})
    valueName?: string
}