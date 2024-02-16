import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Status } from '../enum/status.enum';

@ObjectType()
@Schema()
export class Customer {
  @Field(() => String)
  _id: string;

  @Field(()=>String)
  @Prop({type: String})
  name: string

  @Field(()=>String)
  @Prop({type: String})
  email: string
  
  @Field(()=>String)
  @Prop({type: String})
  mobile_no: string

  @Field(()=>String)
  @Prop({type: String})
  password: string

  @Field(()=>Number)
  @Prop({type: Number, default: 0})
  balance: number

  @Field(()=>String)
  @Prop({type: String})
  street: string

  @Field(()=>String)
  @Prop({type: String})
  area: string

  @Field(()=>String)
  @Prop({type: String})
  city: string

  @Field(()=>String)
  @Prop({type: String, default: Status.ACTIVE})
  status: Status
}
