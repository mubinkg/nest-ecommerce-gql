import { Injectable } from '@nestjs/common';
import { CreateWithdrawalInput } from '../dto/create-withdrawal.input';
import { UpdateWithdrawalInput } from '../dto/update-withdrawal.input';

@Injectable()
export class WithdrawalService {
  async create(createWithdrawalInput: CreateWithdrawalInput, user:any) {
    return 'This action adds a new withdrawal';
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
