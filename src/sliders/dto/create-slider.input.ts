import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSliderInput {
  @Field(() => String, {nullable:true})
  slider_type: string;

  @Field(() => String, {nullable:true})
  image?: string;

  @Field(() => String , {nullable:true})
  link?: string;
}
