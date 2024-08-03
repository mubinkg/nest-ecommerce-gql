import { Injectable } from '@nestjs/common';
import { CreateWithdrawalInput } from '../dto/create-withdrawal.input';
import { UpdateWithdrawalInput } from '../dto/update-withdrawal.input';
import { InjectModel } from '@nestjs/mongoose';
import { Withdrawal, WithdrawalDocument } from '../entities/withdrawal.entity';
import { Model } from 'mongoose';

@Injectable()
export class WithdrawalService {

  constructor(
    @InjectModel(Withdrawal.name) private readonly withdrawalModel:Model<WithdrawalDocument>
  ){}

  async create(createWithdrawalInput: CreateWithdrawalInput, user:any) {
    try{

    }
    catch(errr){
      throw errr;
    }
  }

  findAll() {
    return `This action returns all withdrawal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} withdrawal`;
  }

  update(id: number, updateWithdrawalInput: UpdateWithdrawalInput) {
    return `This action updates a #${id} withdrawal`;
  }

  remove(id: number) {
    return `This action removes a #${id} withdrawal`;
  }
}
