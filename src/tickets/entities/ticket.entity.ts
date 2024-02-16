import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Ticket {
  @Field(() => String, {nullable:true})
  @Prop({type: String})
  ticket_type?: string;
}
