import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateTicketInput {
  
  @Field(()=>String)
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  ticket_type:string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  subject:string

  @Field(()=>String)
  @IsNotEmpty()
  @IsEmail()
  email:string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  description:string
}
