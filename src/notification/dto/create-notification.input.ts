import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  body?: string
}
