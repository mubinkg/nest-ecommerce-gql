import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerInput } from '../dto/create-customer.input';
import { DeleteCustomerInput } from '../dto/delete-customer.input'
import { AuthResponseDto } from '../dto/auth-response.dto';
import { SignInDto } from '../dto/signin.dto';
import { VerifyUser } from '../entities/verify-user.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Mutation(() => AuthResponseDto, {name: 'registerUser'})
  createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput):Promise<AuthResponseDto> {
    return this.customersService.create(createCustomerInput);
  }

  @Query(()=>Customer)
  @UseGuards(GqlAuthGuard)
  customer(
    @CurrentUser('user') user:any
  ){
    return this.customersService.findOne(user.userId)
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

  @Mutation(()=>Customer, {name: 'deleteUser'})
  @UseGuards(GqlAuthGuard)
  deleteUser(
    @Args('deleteCustomerInput') deleteCustomerInput:DeleteCustomerInput,
    @CurrentUser('user') user:any
  ){
    return this.customersService.remove(deleteCustomerInput,user)
  }

  @Mutation(()=>String, {name: 'resetPassword'})
  resetPassword(
    @Args('phone') phone:string,
    @Args('password') password:string
  ){
    return this.customersService.resetPass(phone, password)
  }
  
}
