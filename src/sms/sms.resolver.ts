import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SmsService } from './sms.service';
import { Sm } from './entities/sm.entity';
import { CreateSmInput } from './dto/create-sm.input';
import { UpdateSmInput } from './dto/update-sm.input';

@Resolver(() => Sm)
export class SmsResolver {
  constructor(private readonly smsService: SmsService) {}

  @Mutation(() => String, {name: 'sendOtp'})
  createSm(@Args('mobile') mobile: string) {
    return this.smsService.create(mobile);
  }

  @Query(()=>Boolean, {nullable:true})
  verifyOtp(
    @Args('phoneNumber') phoneNumber:string,
    @Args('otp') otp:string
  ){
    return this.verifyOtp(phoneNumber, otp)
  }

  @Query(() => [Sm], { name: 'sms' })
  findAll() {
    return this.smsService.findAll();
  }

  @Query(() => Sm, { name: 'sm' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.smsService.findOne(id);
  }

  @Mutation(() => Sm)
  updateSm(@Args('updateSmInput') updateSmInput: UpdateSmInput) {
    return this.smsService.update(updateSmInput.id, updateSmInput);
  }

  @Mutation(() => Sm)
  removeSm(@Args('id', { type: () => Int }) id: number) {
    return this.smsService.remove(id);
  }
}
