import { InputType, Int, Field } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAreaInput {
 
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  area_name: String;

  @Field(() => String)
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  city_id: String;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  minimum_free_delivery_order_amount?: Number;

  @Field(() => Number)
  @IsNumber()
  @IsNotEmpty()
  delivery_charges: Number;
}
