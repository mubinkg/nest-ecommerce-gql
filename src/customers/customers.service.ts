import { Injectable, NotAcceptableException, NotImplementedException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './entities/customer.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CustomersService {

  constructor(
    @InjectModel(Customer.name) private readonly customerModel:Model<CustomerDocument>
  ){}

  async create(createCustomerInput: CreateCustomerInput) {
    try{
      if(createCustomerInput.email){
        const user = await this.customerModel.findOne({email: createCustomerInput.email})
        if(user){
          throw new NotAcceptableException('User Exist')
        }
      }
      if(createCustomerInput.mobile_no){
        const user = this.customerModel.findOne({mobile_no: createCustomerInput.mobile_no})
        if(user){
          throw new NotAcceptableException('User Exist')
        }
      }
      const hash = await bcrypt.hash(createCustomerInput.password, 10);
      createCustomerInput.password = await bcrypt.hash(createCustomerInput.password, hash)
      const customer = await this.customerModel.create(createCustomerInput)
      customer.password = ''
      return customer
    }
    catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerInput: UpdateCustomerInput) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
