import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAreaInput {
 
  @Field(() => String, { nullable: true})
  area_name?: String;

  @Field(() => String, { nullable: true})
  city_id?: String;

  @Field(() => String, { nullable: true})
  zipcode_id?: String;

  @Field(() => Number, { nullable: true})
  minimum_free_delivery_order_amount?: Number;

  @Field(() => Number, { nullable: true})
  delivery_charges?: Number;
}
