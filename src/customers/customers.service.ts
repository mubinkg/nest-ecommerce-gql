import { Injectable, NotAcceptableException, NotFoundException, NotImplementedException, UnauthorizedException } from '@nestjs/common';
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
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DeleteCustomerInput } from './dto/delete-customer.input';
import { Status } from './enum/status.enum';


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
      const customer = await this.customerModel.findOne({mobile_no: signinInput.mobile_no, status:Status.ACTIVE})
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

  async update(id: string, updateCustomerInput: UpdateCustomerDto) {
    try{
      const updateData = {}
      const customer = await this.customerModel.findById(id)
      if(!customer){
        throw new NotFoundException('Customer not found')
      }
      if(updateCustomerInput?.old){
        const compare = bcrypt.compare(updateCustomerInput.old, customer.password)
        if(!compare){
          throw new NotImplementedException('Password not matched')
        }
        if(!updateCustomerInput?.new){
          throw new NotImplementedException('Give new password')
        }
        const newPassword = await bcrypt.hash(updateCustomerInput.new, 10);
        updateData['password'] = newPassword
      }
      if(updateCustomerInput?.username) updateData['username'] = updateCustomerInput.username
      if(updateCustomerInput?.mobile_no) updateData['mobile_no'] = updateCustomerInput.mobile_no
      if(updateCustomerInput?.email) updateData['email'] = updateCustomerInput.email
      if(updateCustomerInput?.address) updateData['address'] = updateCustomerInput.address
      if(updateCustomerInput?.area) updateData['area'] = updateCustomerInput.area
      if(updateCustomerInput?.city) updateData['city'] = updateCustomerInput.city
      if(updateCustomerInput?.referral_code) updateData['referral_code'] = updateCustomerInput.referral_code

      await this.customerModel.findByIdAndUpdate(id, updateData)
      return await this.customerModel.findById(id)
      
    }
    catch(err){
      throw new NotImplementedException('Can not udpate customer.')
    } 
  }

  async remove(deleteCustomerInput: DeleteCustomerInput, user:any) {
      try{
        const userid = user?.userId
        const userData = await this.customerModel.findOne({mobile_no: deleteCustomerInput.mobile})
        if(!userData){
          throw new NotFoundException('User not found.')
        }
        const compPass = await bcrypt.compare(deleteCustomerInput.password, userData.password)
        if(!compPass){
          throw new NotImplementedException('Password not matched')
        }
        if(userid !== userData._id.toString()){
          throw new NotImplementedException('Unrecognized user')
        }

        await this.customerModel.findByIdAndUpdate(userid, {status: Status.INACTIVE})
        return await this.customerModel.findById(userid)
      }
      catch(err){
        throw err;
      }
  }
}
