import { IsEnum, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field, PartialType, registerEnumType } from '@nestjs/graphql';
import { TicketTypeEnum } from '../enum/ticket-type.enum';


registerEnumType(TicketTypeEnum, {
  name: 'TicketTypeEnum'
})

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {
  @Field(() => String)
  @IsNotEmpty()
  @IsMongoId()
  id:string

  @Field(()=>TicketTypeEnum, {defaultValue: TicketTypeEnum.PENDING, nullable:true})
  @IsEnum(TicketTypeEnum)
  @IsOptional()
  status?: TicketTypeEnum
}
