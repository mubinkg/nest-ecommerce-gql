
import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { SortingOrder, SortingType, Status } from '../data/enum';
registerEnumType(Status,{
  name:"Status"
})

registerEnumType(SortingOrder,{
    name:"SortingOrder"
  })

  registerEnumType(SortingType,{
    name:"SortingType"
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

  @Field(()=>SortingType, {defaultValue:SortingType.CreateAt})
  sort?: SortingType

  @Field(()=>SortingOrder, {defaultValue:SortingOrder.DESC})
  order?: SortingOrder


}
