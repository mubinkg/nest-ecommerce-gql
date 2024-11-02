import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../entities/product.entity';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { ProductVariantsService } from '../../product-variants/services/product-variants.service';
import { GetProductDto } from '../dto/get-products.dto';
import { UpdateProductGlobalOrderNoInput } from '../dto/updateGlobalOrderNo.input';
import { ProductAttributeInput } from '../dto/product-attribute.input';
import { convertToObjectId } from 'src/utils/convert-to-objectid';
import { getProductsQuery, productDetailsQuery } from '../mongo';
import { Attribute } from '../entities/product-attribute.entity';
import { FavoriteProductService } from 'src/favourites/services/favorite.product.service';
import * as fs from 'fs'
import { CancelableTill, VideoType } from '../enum';
import { CreateProductVariantInput } from 'src/product-variants/dto/create-product-variant.input';
import { BulkProductInput } from '../dto/bulk-product.unput';
const xlsx = require('xlsx')

@Injectable()
export class ProductsService {

  constructor(
    private productVariantsService: ProductVariantsService,
    private readonly favoriteProductService: FavoriteProductService,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    @InjectModel(Attribute.name) private readonly attributeModel: Model<Attribute>
  ) { }

  async create(createProductInput: CreateProductInput) {
    const { createProductVariantInput } = createProductInput

    try {
      createProductInput.attributes = createProductInput.attributes.map((d: ProductAttributeInput) => ({
        ...d,
        attribute: convertToObjectId(d.attribute),
        values: d.values.map((d: any) => convertToObjectId(d))
      }))
      const productCount = await this.productModel.countDocuments()

      createProductInput.globalOrderNo = productCount + 1

      const product = await this.productModel.create(createProductInput)

      await this.productVariantsService.create(createProductVariantInput.map((d) => ({ ...d, product: product._id })))

      if (createProductInput?.attributes && createProductInput.attributes.length) {
        await this.attributeModel.insertMany(createProductInput.attributes.map(d => ({ ...d, product: product._id.toString() })))
      }

      return product

    } catch (err) {
      Logger.log(err)
      return new NotImplementedException('Can not create product' + err.message)
    }
  }

  async createBulkFromXlsx(bulkProductInput: BulkProductInput) {
    try {
      const fileinfo = await bulkProductInput.productFile
      const streamData = []
      const getFileData = () => new Promise((resolve, reject) => fileinfo.createReadStream().on('data', (data) => {
        streamData.push(data)
      }).on('end', () => {
        return resolve(streamData)
      }).on('error', () => {
        return reject('Error on getting file data')
      })
      )
      const fileContent: any = await getFileData()
      const buffer = Buffer.concat(fileContent)
      const workbook = xlsx.read(buffer, { type: "buffer" })
      const firstSheetName = workbook.SheetNames[0];
      const firstSheet = workbook.Sheets[firstSheetName];
      const data = xlsx.utils.sheet_to_json(firstSheet);
      for (let i = 0; i < data.length; i++) {
        const currentProduct = data[i]
        const productInput: CreateProductInput = {
          category: currentProduct['category_id'],
          // tax: currentProduct['tax'],
          product_type: currentProduct['type'],
          variant: currentProduct['stock type'],
          pro_input_name: currentProduct['name'],
          short_description: currentProduct['short_description'],
          indicator: parseInt(currentProduct['indicator'] || '0'),
          // cod_allowed: parseInt(currentProduct['cod_allowed']),
          minimum_order_quantity: parseInt(currentProduct['minimum order quantity'] || '0'),
          quantity_step_size: parseInt(currentProduct['quantity step size'] || '0'),
          total_allowed_quantity: parseInt(currentProduct['total allowed quantity'] || '0'),
          // is_price_inclusive_tax: currentProduct['is prices inclusive tax'],
          is_returnable: parseInt(currentProduct['is returnable'] || '0'),
          is_cancelable: parseInt(currentProduct['is cancelable'] || '0'),
          cancelable_till: currentProduct['cancelable till'] as CancelableTill,
          pro_input_image: currentProduct['image'],
          other_images: currentProduct['other_images']?.split(','),
          video_type: currentProduct['video_type'] as VideoType,
          video: currentProduct['video'],
          tags: currentProduct['tags'],
          warranty_period: currentProduct['warranty period'],
          guarantee_period: currentProduct['guarantee period'],
          made_in: currentProduct['made in'],
          pro_input_description: currentProduct['description'],
          seller: currentProduct['seller_id'],
          brand: currentProduct['brand'],
          extra_input_description: currentProduct['extra_description'],
          status: 0
        }

        const productCount = await this.productModel.countDocuments()
        productInput.globalOrderNo = productCount + 1

        const product = await this.productModel.create(productInput)

        let next_product_attribute = true
        let product_attribute_key = 0
        const product_attribute_list:ProductAttributeInput[] = []

        while(next_product_attribute){
          const baseKey = `${!product_attribute_key ? "" : `_${product_attribute_key}`}`
          if(!currentProduct[`product attribute${baseKey}`]){
            next_product_attribute = false
          }else{
            const attribute:ProductAttributeInput ={
              product: product._id,
              attribute:currentProduct[`product attribute${baseKey}`],
              values: currentProduct[`product attribute values${baseKey}`]?.split(',')
            }
            product_attribute_list.push(attribute)
          }
          product_attribute_key = product_attribute_key + 1;
        }

        await this.attributeModel.insertMany(product_attribute_list)

        let next_product = true
        let key = 0
        const productVariantInputs: CreateProductVariantInput[] = []
        while (next_product) {
          const baseKey = `${!key ? "" : `_${key}`}`
          const base = `attributes${baseKey}`
          if (!currentProduct[base]) {
            next_product = false
          } else {
            const productVariantInput = {
              attributeReference: currentProduct[`attributes${baseKey}`]?.split(','),
              attributeValues: currentProduct[`attribute value ids${baseKey}`].split(','),
              price: currentProduct[`price${baseKey}`],
              specialPrice: currentProduct[`special price${baseKey}`],
              sku: currentProduct[`sku${baseKey}`],
              totalStock: currentProduct[`stock${baseKey}`],
              productType: currentProduct['type'],
              stockType: currentProduct['stock type'],
              weight: currentProduct[`weight${baseKey}`],
              height: currentProduct[`height${baseKey}`],
              breadth: currentProduct[`breadth${baseKey}`],
              length: currentProduct[`length${baseKey}`],
              product: product._id
            }
            productVariantInputs.push(productVariantInput)
          }
          key = key + 1
        }
        await this.productVariantsService.create(productVariantInputs)
      }
      return 'Done'
    } catch (err) {
      throw err;
    }
  }

  async findAll(getProductInputDto: GetProductDto, user: any) {
    try {
      const userId = user.userId
      const productQuery = getProductsQuery(getProductInputDto)
      let products = await this.productModel.aggregate(productQuery)
      const favoriteProductList = await this.favoriteProductService.getFavoriteProductList(userId)
      products = products.map((product: Product) => {
        product.is_favorite = favoriteProductList.find((favorite: any) => favorite == product._id.toString()) ? true : false;
        return product
      })
      return products
    }
    catch (err) {
      throw err;
    }
  }

  async findAllFroWeb(getProductInputDto: GetProductDto) {
    try {
      const productQuery = getProductsQuery(getProductInputDto)
      let products = await this.productModel.aggregate(productQuery)
      return products
    }
    catch (err) {
      throw err;
    }
  }

  async getProductForWeb(getProductInputDto: GetProductDto) {
    try {
      const productQuery = getProductsQuery(getProductInputDto)
      let products = await this.productModel.aggregate(productQuery)
      return products
    }
    catch (err) {
      throw err;
    }
  }


  async updateProductGlobalOrderNo(updateProductGlobalOrderNoInput: UpdateProductGlobalOrderNoInput) {

    const { productArray } = updateProductGlobalOrderNoInput

    let updateArrayInput = [], updatedProducts

    if (productArray.length === 0) {
      throw new NotAcceptableException(`Product array length cannot be zero`)
    }

    try {

      productArray.map((element) => {
        updateArrayInput.push({
          updateOne:
          {
            "filter": { _id: element._id },
            "update": { globalOrderNo: element.globalOrderNo },            // Changed in 4.2
          }
        })
      })

      updatedProducts = await this.productModel.bulkWrite(updateArrayInput)


    } catch (error) {
      throw new InternalServerErrorException('Failed to update product order no')
    }

    return "Successfully updated"

  }

  async findOne(id: string, user: { userId: string }) {
    try {
      const data: Product[] = await this.productModel.aggregate(productDetailsQuery(id))
      if (data?.length <= 0) {
        throw new NotFoundException('Product not found')
      }
      const product = data[0]
      const isFavorite = await this.favoriteProductService.getFavoriteProduct(user.userId, product._id)
      product.is_favorite = isFavorite
      return product
    }
    catch (err) {
      throw err;
    }
  }

  async productForWeb(id: string) {
    try {
      const data: Product[] = await this.productModel.aggregate(productDetailsQuery(id))
      if (data?.length <= 0) {
        throw new NotFoundException('Product not found')
      }
      const product = data[0]
      return product
    }
    catch (err) {
      throw err;
    }
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    try {
      await this.productModel.findByIdAndDelete(id)
      return 'Deleted ' + id
    }
    catch (err) {
      throw err
    }
  }
}
