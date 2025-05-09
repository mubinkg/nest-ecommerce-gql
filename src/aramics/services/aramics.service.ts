import { Injectable } from '@nestjs/common';
import { CreateAramicInput } from '../dto/create-aramic.input';
import { UpdateAramicInput } from '../dto/update-aramic.input';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { DeliveryCharge } from '../dto/delivery-charge.input';
import { Model } from 'mongoose';
import { DeliveryChargeDocument } from '../entities/aramic.entity';
import { ProductVariant, ProductVariantDocument } from 'src/product-variants/entities/product-variant.entity';
import { convertToObjectId } from 'src/utils/convert-to-objectid';
import { Address, AddressDocument } from 'src/addresses/entities/address.entity';
import { getCharge } from '../mongo';

@Injectable()
export class AramicsService {
  constructor(
    @InjectModel(DeliveryCharge.name) private readonly deliveryChargeModel: Model<DeliveryChargeDocument>,
    @InjectModel(ProductVariant.name) private readonly productVariant:Model<ProductVariantDocument>,
    @InjectModel(Address.name) private readonly addressModel:Model<AddressDocument>
  ) { }
  async create() {
    try {
      await axios.post(
        'https://wms.acieshop.com/api/orderNomalRegist',
        {
          values: [{
            "Departure_Station": "SEL",
            "Arrival_Nation": "US",
            "Transfer_Company_Code": "",
            "Order_Date": "20220922",
            "Order_Number": "20201117101799",
            "Hawb_No": "",
            "Shipper_Name": "ACI EXPRESSFF (U.K) LTD.",
            "Shipper_Country": "KR",
            "Shipper_State": "",
            "Shipper_City": "SEL",
            "Shipper_Zip": "07641",
            "Shipper_Address": "Dubai",
            "Shipper_Address_Detail": "Hall town Dubai",
            "Shipper_Tel": "+8210976543",
            "Shipper_Hp": "",
            "Shipper_Email": "",
            "Receiver_Country": "US",
            "Receiver_State": "New York",
            "Receiver_City": "New York",
            "Receiver_District": "",
            "Receiver_Zip": "12401",
            "Receiver_Name": "Kamlesh kumar",
            "Native_Receiver_Name": "Native",
            "Receiver_Address_Detail": "",
            "Receiver_Tel": "+8210976543",
            "Receiver_Hp": "",
            "Receiver_Email": "",
            "Box_Count": "1",
            "Actual_Weight": "2.6",
            "Volume_Weight": "",
            "Volume_Length": "",
            "Volume_Width": "",
            "Volume_Height": "",
            "Custom_Clearance_ID": "",
            "Buy_Site": "https://kocart.com/",
            "Size_Unit": "CM",
            "Weight_Unit": "KG",
            "Get_Buy": "1",
            "Mall_Type": "A",
            "Warehouse_Msg": "",
            "Delivery_Msg": "Call M",
            "Exp_Licence_YN": "N",
            "Exp_Business_Num": "",
            "Item_Material": [
              {
                "Customer_Item_Code": "ITEM2",
                "Hs_Code": "",
                "Brand": "Handcraft Vietnam1",
                "Item_Detail": "(Handcraft Vietnam) Straw Tote Bag",
                "Native_Item_Detail": "75301-6-1 VOGACORTE 70",
                "Item_Cnt": "1",
                "Unit_Value": "20.5",
                "Make_Country": "GB",
                "Make_Company": "",
                "Item_Div": "",
                "Qty_Unit": "EA",
                "Item_Url": "TESTURL.COM",
                "Item_Img_Url": "",
                "Trking_Company": "EPOST",
                "Trking_Number": "6063412344789",
                "Trking_Date": "20220921",
                "Chg_Currency": "USD",
                "Item_Material": ""
              }
            ]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            "UserID": "eresitrade",
            "APIkey": "M6sCqNy4tq4F4bGq/J51xkuYv+6qJ68Rdd8bW0lUsIQ="
          }
        }
      )
      return 'success'
    }
    catch (err) {
      console.log(err)
      return ""
    }
  }

  async getCountries(){
    try{
      return await this.deliveryChargeModel.distinct("eramicsCountryName")
    }
    catch(err){
      throw err;
    }
  }

  findAll() {
    return `This action returns all aramics`;
  }

  async findOne(deliveryCharge: DeliveryCharge) {
    try {
      const variants = await this.productVariant.find({_id:{
        $in: deliveryCharge.product_variants.map(d=>convertToObjectId(d))
      }})
      let weight = 0;
      variants.forEach((d:ProductVariant,id:number)=>{
        weight = weight + d.weight*deliveryCharge.quantity[id]
      })
      const addressDetials = await this.addressModel.findById(deliveryCharge.address_id)
      const query:any = getCharge(weight.toString(), addressDetials.country)
      const totalDeliveryCharge = await this.deliveryChargeModel.aggregate(query)
      return totalDeliveryCharge[0]?.value || 0;
    }
    catch (err) {
      throw err;
    }
  }

  update(id: number, updateAramicInput: UpdateAramicInput) {
    return `This action updates a #${id} aramic`;
  }

  remove(id: number) {
    return `This action removes a #${id} aramic`;
  }
}
