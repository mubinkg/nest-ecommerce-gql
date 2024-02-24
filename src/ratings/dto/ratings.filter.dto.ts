// product_id : 12

// user_id : 1 {optional}

// limit:25 // { default - 25 } optional

// offset:0 // { default - 0 } optional

// sort: type // { default - type } optional

// order:DESC/ASC // { default - DESC } optional
import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { SortingOrder, Status } from '../data/enum';
registerEnumType(Status,{
  name:"Status"
})

registerEnumType(SortingOrder,{
    name:"SortingOrder"
  })
@InputType()
export class RatingFilterDto {
  @Field(()=>String, {nullable:true})
  product_id: string

  @Field(()=>String, {nullable:true})
  user_id?: String

  @Field(()=>Number, {nullable:true,defaultValue:25})
  limit?: number

  @Field(()=>Number, {nullable:true,defaultValue:0})
  offset?: number

  @Field(()=>String, {nullable:true})
  sort?: string

  @Field(()=>SortingOrder, {defaultValue:SortingOrder.DESC})
  order?: SortingOrder


}
