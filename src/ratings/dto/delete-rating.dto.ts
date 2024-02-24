import { InputType,  Field, registerEnumType } from '@nestjs/graphql';
import { Status } from '../data/status.enum';
registerEnumType(Status,{
  name:"Status"
})
@InputType()
export class DeleteRatingInput {
 
    @Field(() => String)
    id: string;
   @Field(() => Status, { nullable: true})
   status?: Status;
}
