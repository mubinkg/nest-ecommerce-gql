import { InputType, Int, Field } from '@nestjs/graphql';
import { ProductAttributeValueInput } from './product-attribute-value.input';
import mongoose from 'mongoose';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProductAttributeInput {
  @Field(()=>String,{nullable:true})
  name:string

  @Field(()=>String)
  attributeSet:mongoose.Types.ObjectId

  @Field(()=>[ProductAttributeValueInput],{nullable:true})
  @IsNotEmpty()
  values?:ProductAttributeValueInput[]
}
