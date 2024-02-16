import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCityInput {
  @Field(() => String, { nullable: true })
  city_name:string;
}
