import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from '../dto/create-transaction.input';
import { UpdateTransactionInput } from '../dto/update-transaction.input';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from '../entities/transaction.entity';
import { Model } from 'mongoose';
import { convertToObjectId } from 'src/utils/convert-to-objectid';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel:Model<TransactionDocument>
  ){}

  async create(createTransactionInput: CreateTransactionInput, user:any) {
    createTransactionInput.user = user.userId
    return await this.transactionModel.create(createTransactionInput)
  }

  async findAll(limit:number, offset:number, user:any) {
    try{
      if(user?.isAdmin){
        const transactionList = await this.transactionModel.find({user: convertToObjectId(user.userId)}).populate({
          path: 'user'
        }).limit(limit).skip(offset)
        const count = await this.transactionModel.countDocuments({user: convertToObjectId(user.userId)})
        return {
          transactionList,
          count
        }
      }
      const transactionList = await this.transactionModel.find({}).populate({
        path: 'user'
      }).limit(limit).skip(offset)
      const count = await this.transactionModel.countDocuments({})
      return {
        transactionList, count
      }
    }
    catch(err){
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionInput: UpdateTransactionInput) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
