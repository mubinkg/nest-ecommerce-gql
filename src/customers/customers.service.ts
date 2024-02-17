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

  async update(id: string, updateCustomerInput: UpdateCustomerInput) {
    try{
      if(updateCustomerInput.password){
        const hash = await bcrypt.hash(updateCustomerInput.password, 10);
        updateCustomerInput.password = await bcrypt.hash(updateCustomerInput.password, hash)
      }
      const customer = await this.customerModel.findById(id)
      customer.password = ''
      return customer
    }
    catch(err){
      throw new NotImplementedException('Can not udpate customer.')
    } 
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
