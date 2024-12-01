import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Faq } from '../entities/faq.entity';
import { SchemaFactory } from '@nestjs/mongoose';
import { FaqType } from '../enum/faq-type.enum';


registerEnumType(FaqType,{
  name: "FaqType"
})

@InputType()
export class CreateFaqInput {
  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  question?: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  ans?: string

  @Field(()=>FaqType)
  @IsString()
  @IsNotEmpty()
  faqType?: FaqType
}

export type FaqDocument = HydratedDocument<Faq>
export const FaqSchema = SchemaFactory.createForClass(Faq)