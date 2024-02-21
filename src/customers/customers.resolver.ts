import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { AuthResponseDto } from './dto/auth-response.dto';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Mutation(() => AuthResponseDto, {name: 'registerUser'})
  createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput):Promise<AuthResponseDto> {
    return this.customersService.create(createCustomerInput);
  }

  // @Query(() => [Customer], { name: 'customers' })
  // findAll() {
  //   return this.customersService.findAll();
  // }

  // @Query(() => Customer, { name: 'customer' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.customersService.findOne(id);
  // }

  // @Mutation(() => Customer)
  // updateCustomer(@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
  //   return this.customersService.update(updateCustomerInput.id, updateCustomerInput);
  // }

  // @Mutation(() => Customer)
  // removeCustomer(@Args('id', { type: () => Int }) id: number) {
  //   return this.customersService.remove(id);
  // }
}
