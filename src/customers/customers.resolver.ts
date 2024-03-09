import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SignInDto } from './dto/signin.dto';
import { VerifyUser } from './entities/verify-user.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './jwt-guards';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Mutation(() => AuthResponseDto, {name: 'registerUser'})
  createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput):Promise<AuthResponseDto> {
    return this.customersService.create(createCustomerInput);
  }

  @Query(() => AuthResponseDto, { name: 'signIn' })
  signIn(
    @Args('signinInput') signinInput:SignInDto
  ) {
    return this.customersService.signIn(signinInput);
  }

  @Query(()=>Boolean, {name: 'verifyUser'})
  verifyUser(
    @Args('verifyUserInput') verifyUserInput:VerifyUser
  ){
    return this.customersService.verifyUser(verifyUserInput)
  }

  @Mutation(()=>Customer, {name: 'updateUser'})
  @UseGuards(GqlAuthGuard)
  updateUser(
    @Args('updateCustomerInput') updateCustomerInput:UpdateCustomerDto
  ){
    return this.customersService.update(updateCustomerInput.user_id, updateCustomerInput)
  }
  
}
