import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { SellerStatusEnum } from '../enum/seller-status.enum';


registerEnumType(SellerStatusEnum, {
  name: "SellerStatusEnum"
})

@InputType()
export class CreateSellerInput {
  
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  mobile: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  email: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  address: String;

  @Field(() => GraphQLUpload, {nullable:true})
  address_proof?: FileUpload | string;

  @Field(() => GraphQLUpload, {nullable:true})
  national_identity_card?: FileUpload | string;

  @Field(() => GraphQLUpload, {nullable:true})
  business_license?: FileUpload | string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  account_number: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  account_name: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  bank_code: String;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  bank_name: String;
}
