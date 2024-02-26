import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './entities/cart.entity';
import { Model } from 'mongoose';

@Injectable()
export class CartService {

  @InjectModel(Cart.name) private readonly cartModel:Model<CartDocument>

  async create(createCartInput: CreateCartInput, user:any) {
    try{
      const cartInput = {...createCartInput, user_id: user.userId}
      return await this.cartModel.create(cartInput)
    }
    catch(err){
      throw new NotImplementedException('Error on creating cart')
    }
  }

  async findAll(user:any) {
    try{
      const userId = user.userId
      return await this.cartModel.find({user_id: userId})
    }
    catch(err){
      throw new NotImplementedException('Can not get user card details.')
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartInput: UpdateCartInput) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
