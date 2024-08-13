import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateCartInput } from '../dto/create-cart.input';
import { UpdateCartInput } from '../dto/update-cart.input';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from '../entities/cart.entity';
import { Model } from 'mongoose';
import { GetCartDto } from '../dto/get-cart.dto';
import { DeliveryCharge, DeliveryChargeDocument } from '../entities/delvary-charge.entity';
import { AddressesService } from 'src/addresses/services/addresses.service';
import { Address } from 'src/addresses/entities/address.entity';
import { getCart } from '../mongo';

@Injectable()
export class CartService {

  constructor(
    @InjectModel(Cart.name) private readonly cartModel:Model<CartDocument>,
    @InjectModel(DeliveryCharge.name) private readonly delevaryChargeModel:Model<DeliveryChargeDocument>,
    private readonly addressService:AddressesService
  ){}

  async create(createCartInput: CreateCartInput, user:any) {
    try{
      const cartInput = {...createCartInput, user_id: user.userId}
      return await this.cartModel.create({...cartInput, user: cartInput.user_id, product_variant:createCartInput.product_variant_id})
    }
    catch(err){
      throw new NotImplementedException('Error on creating cart')
    }
  }

  async findAll(user:any) {
    try{
      const userId = user.userId
      // let deliverCharge = null
      // if(getCartDto.only_delivery_charge){
      //   const address:Address = await this.addressService.findOne(getCartDto.address_id)
      //   const chargeDetails = await this.delevaryChargeModel.findOne({countryName:address.country})
      //   deliverCharge = chargeDetails.price
      //   return {
      //     delivery_charge: deliverCharge,
      //     carts: null
      //   }
      // }
      const carts = await this.cartModel.aggregate(getCart(userId))
      return carts
    }
    catch(err){
      throw new NotImplementedException('Can not get user card details.')
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(updateCartInput: UpdateCartInput) {
    try{
      await this.cartModel.findByIdAndUpdate(updateCartInput.cartId, {qty:updateCartInput.qty})
      return await this.cartModel.findById(updateCartInput.cartId)
    }
    catch(err){
      throw new NotImplementedException('Can not udpate cart')
    }
  }

  async remove(id: string) {
    try{
      return await this.cartModel.findByIdAndDelete(id)
    }
    catch(err){
      throw new NotImplementedException('Can not remove cart')
    }
  }
}
