import { Injectable } from '@nestjs/common';
import { CreateSmInput } from './dto/create-sm.input';
import { UpdateSmInput } from './dto/update-sm.input';
import * as twilio from 'twilio'

const accountSid = 'AC93bb159c610dd75a5488a47e1ad69ff2';
const authToken = 'b76665e2a02130a8989f07f17b42b4aa';
const verifySid = 'VA39afc9b4fd20e9ef64b52feef17c9445'
const client = twilio(accountSid, authToken)

@Injectable()
export class SmsService {
  client:any
  constructor(){
    this.client = twilio(accountSid,authToken)
  }
  
  async create(mobile: string) {
    const verify = (mobile:string)=> new Promise((resolve, reject)=>{
      client.verify.v2
      .services(verifySid)
      .verifications.create({ to: mobile, channel: "sms" })
      .then((verification) => resolve('Otp sent to your phone number.'))
      .catch(err=> reject('Something went wrong when sending otp'))
    })

    try{
      return await verify(mobile)
    }
    catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all sms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sm`;
  }

  update(id: number, updateSmInput: UpdateSmInput) {
    return `This action updates a #${id} sm`;
  }

  remove(id: number) {
    return `This action removes a #${id} sm`;
  }

  async verifyOtp(phoneNumber:string, otp:string){
    const verifyOtp = (phoneNumber:string, otp:string)=>new Promise((resolve, reject)=>{
      client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otp })
      .then((verification_check) => resolve(true))
      .catch(err=>{
        resolve(false)
      })
    })

    try{
      return await verifyOtp(phoneNumber, otp)
    }
    catch(err){
      throw err;
    }
  }
}
