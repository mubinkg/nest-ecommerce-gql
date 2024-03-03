import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateOrderInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  status: string
}
