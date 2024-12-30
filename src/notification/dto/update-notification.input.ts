import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationInput {
  @Field(() => String)
  id: string;
}
