import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateHotDealInput {
  @IsArray()
  @IsNotEmpty()
  @Field(()=>[String])
  products:string[]

  @Field(()=>Date)
  @IsDate()
  @IsNotEmpty()
  validTime:Date
}
