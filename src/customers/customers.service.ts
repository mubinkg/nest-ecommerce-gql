import { Injectable, NotAcceptableException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InjectModel } from '@nestjs/mongoose';
import { Customer, CustomerDocument } from './entities/customer.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { VerifyUser } from './entities/verify-user.dto';


@Injectable()
export class CustomersService {

  constructor(
    @InjectModel(Customer.name) private readonly customerModel:Model<CustomerDocument>,
    private readonly jwtService:JwtService
  ){}

  async create(createCustomerInput: CreateCustomerInput):Promise<AuthResponseDto> {
    try{
      if(createCustomerInput.email){
        const user = await this.customerModel.findOne({email: createCustomerInput.email})
        if(user){
          throw new NotAcceptableException('Email alredy exist.')
        }
      }
      if(createCustomerInput.mobile_no){
        const user = await this.customerModel.findOne({mobile_no: createCustomerInput.mobile_no})
        if(user){
          throw new NotAcceptableException('Phone number already exist.')
        }
      }
      const hash = await bcrypt.hash(createCustomerInput.password, 10);
      createCustomerInput.password = await bcrypt.hash(createCustomerInput.password, hash)
      const customer = await this.customerModel.create(createCustomerInput)
      const payload = {
        id:customer._id.toString(),
        mobile_no: customer.mobile_no,
        name: customer.name
      }
      const access_token = await this.jwtService.signAsync(payload)
      customer.password = ''
      return {
        access_token: access_token,
        customer: customer
      }
    }
    catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all customers`;
  }

  async verifyUser(verifyUserInput:VerifyUser){
    try{
      const query = {
        mobile_no: verifyUserInput.mobile
      }
      if(verifyUserInput.email){
        query['email'] = verifyUserInput.email
      }
      const user = await this.customerModel.exists(query)
      return user?true:false
    }
    catch(err){
      throw err;
    }
  }

  async signIn(signinInput: SignInDto):Promise<AuthResponseDto> {
    try{
      const customer = await this.customerModel.findOne({mobile_no: signinInput.mobile_no})
      if(!customer){
        throw new UnauthorizedException('User not found.')
      }
      const checkPassword = await bcrypt.compare(signinInput.password, customer.password)
      if(!checkPassword){
        throw new UnauthorizedException('Email or password not matched')
      }

      const payload = {
        id:customer._id.toString(),
        mobile_no: customer.mobile_no,
        name: customer.name
      }

      const access_token = await this.jwtService.signAsync(payload)

      return {
        access_token,
        customer
      }
    }
    catch(err){
      throw err;
    }
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
