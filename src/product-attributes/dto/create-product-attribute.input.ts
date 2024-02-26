import { InputType, Int, Field } from '@nestjs/graphql';
import { ProductAttributeValueInput } from './product-attribute-value.input';
import mongoose from 'mongoose';

@InputType()
export class CreateProductAttributeInput {
  @Field(()=>String,{nullable:true})
  name:string

  @Field(()=>String)
  attributeSet:mongoose.Types.ObjectId

  @Field(()=>[ProductAttributeValueInput],{nullable:true})
  values?:ProductAttributeValueInput[]
}
