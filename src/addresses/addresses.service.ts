import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { InjectModel } from '@nestjs/mongoose';
import { Address, AddressDocument } from './entities/address.entity';
import { Model } from 'mongoose';

@Injectable()
export class AddressesService {

  constructor(
    @InjectModel(Address.name) private readonly addressModel:Model<AddressDocument>
  ){}

  async create(createAddressInput: CreateAddressInput):Promise<Address> {
    try{
      const address = await this.addressModel.create({
        ...createAddressInput,
        user: createAddressInput.user_id,
        area: createAddressInput.area_id,
        city: createAddressInput.city_id
      })
      return address
    }
    catch(err){
      throw new NotImplementedException('Can not create address.')
    }
  }

  findAll() {
    return `This action returns all addresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  async update(id: string, updateAddressInput: UpdateAddressInput) {
    try{
      await this.addressModel.findByIdAndUpdate(id, updateAddressInput)
      return await this.addressModel.findById(id)
    }
    catch(err){
      throw new NotImplementedException('Can not update address')
    }
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
