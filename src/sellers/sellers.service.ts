import { Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { CreateSellerInput } from './dto/create-seller.input';
import { UpdateSellerInput } from './dto/update-seller.input';
import { uploadFile } from 'src/util/upload';
import { FileUpload } from 'graphql-upload';
import { InjectModel } from '@nestjs/mongoose';
import { Seller, SellerDocument } from './entities/seller.entity';
import { Model } from 'mongoose';
import { SellerStatusEnum } from './enum/seller-status.enum';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SellersService {

  constructor(
    @InjectModel(Seller.name) private readonly sellerModel:Model<SellerDocument>,
    private readonly jwtService:JwtService
  ){}

  async create(createSellerInput: CreateSellerInput) {
    try{

      const isExist = await this.sellerModel.exists({mobile: createSellerInput.mobile, email: createSellerInput.email})

      if(isExist) {
        throw new NotAcceptableException('Duplicate email or phone')
      }

      createSellerInput.national_identity_card = await uploadFile(createSellerInput.national_identity_card as FileUpload) as string
      createSellerInput.address_proof = await uploadFile(createSellerInput.address_proof as FileUpload) as string
      createSellerInput.business_license = await uploadFile(createSellerInput.business_license as FileUpload) as string
      createSellerInput.password = await bcrypt.hash(createSellerInput.password, 10)
      return await this.sellerModel.create(createSellerInput)
    }
    catch(err){
      throw err;
    }
  }

  async findAll(limit:number, offset: number, status: string) {
    try{
      const query = {isAdmin:false}
      if(status){
        query['status'] = status
      }
      const total = await this.sellerModel.countDocuments(query)
      const sellers = await this.sellerModel.find(query).limit(limit).skip(offset)
      return {
        total,
        sellers
      }
    }catch(err){
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} seller`;
  }

  async update(id: string, updateSellerInput: UpdateSellerInput) {
    try{
      await this.sellerModel.findByIdAndUpdate(id, updateSellerInput)
      return await this.sellerModel.findById(id)
    }
    catch(err){
      throw err;
    }
  }

  async signIn(password:string, mobile:string) {
    try{
      if(!password){
        throw new NotAcceptableException('Password not be empty.')
      }
      if(!mobile){
        throw new NotAcceptableException('Mobile not be empty.')
      }
      const seller = await this.sellerModel.findOne({mobile:mobile})
      const isPassMatch = await bcrypt.compare(password, seller.password)
      if(!isPassMatch){
        throw new UnauthorizedException('Email or password not matched')
      }
      if(seller.isAdmin){
        const payload = {
          id:seller._id.toString(),
          mobile_no: seller.mobile,
          name: seller.name,
          isAdmin: seller.isAdmin
        }
        const access_token = await this.jwtService.signAsync(payload)
        return {
          access_token,
          seller
        }
      }
      if(seller.status === SellerStatusEnum.INACTIVE) throw new NotAcceptableException('Seller not approved yet.')
      const payload = {
        id:seller._id.toString(),
        mobile_no: seller.mobile,
        name: seller.name,
        isAdmin: seller.isAdmin
      }
      const access_token = await this.jwtService.signAsync(payload)
      return {
        access_token,
        seller
      }
    }
    catch(err){
      throw err;
    }
  }
}
