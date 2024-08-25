import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AttributeSetValuesDto{
    @Field(()=>[AttirbuteSetValue], {nullable:true})
    attributeSetValues: AttirbuteSetValue[]
}

@ObjectType()
class AttirbuteSetValue{
    @Field(()=>String)
    _id: string

    @Field(()=>String)
    name: string
}