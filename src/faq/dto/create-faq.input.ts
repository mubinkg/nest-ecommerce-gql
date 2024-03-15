import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Faq } from '../entities/faq.entity';
import { SchemaFactory } from '@nestjs/mongoose';

@InputType()
export class CreateFaqInput {
  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  product?: string

  @Field(()=>String)
  @IsString()
  @IsNotEmpty()
  question?: string
}

export type FaqDocument = HydratedDocument<Faq>
export const FaqSchema = SchemaFactory.createForClass(Faq)