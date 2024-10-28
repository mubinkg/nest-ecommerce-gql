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
import * as csv from 'csv-parser'
import { CancelableTill, VideoType } from '../enum';
import { CreateProductVariantInput } from 'src/product-variants/dto/create-product-variant.input';

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

  async createBulkProduct() {
    try {
      const results = [];
      fs.createReadStream('./data/file.csv', "utf8")
        .on('data', (data) => {
          results.push(data)
        }).on('end', async () => {
          try {
            const dataList = results.toString().split('\n').filter(d => d)
            const finalResult = dataList.map(d => d.split(',')).slice(1,)
            console.log(dataList[0].split(','))
            for (let i = 0; i < finalResult.length; i++) {
              const currentProduct = finalResult[i]
              const productInput: CreateProductInput = {
                category: currentProduct[0],
                // tax: currentProduct[1],
                product_type: currentProduct[2],
                variant: currentProduct[3],
                pro_input_name: currentProduct[4],
                short_description: currentProduct[5],
                indicator: parseInt(currentProduct[6]),
                // cod_allowed: parseInt(currentProduct[7]),
                minimum_order_quantity: parseInt(currentProduct[8]),
                quantity_step_size: parseInt(currentProduct[9]),
                total_allowed_quantity: parseInt(currentProduct[10]),
                // is_price_inclusive_tax: currentProduct[11],
                is_returnable: parseInt(currentProduct[12]),
                is_cancelable: parseInt(currentProduct[13]),
                cancelable_till: currentProduct[14] as CancelableTill,
                pro_input_image: currentProduct[15],
                other_images: currentProduct[16].split(','),
                video_type: currentProduct[17] as VideoType,
                video: currentProduct[18],
                tags: currentProduct[19],
                warranty_period: currentProduct[20],
                guarantee_period: currentProduct[21],
                made_in: currentProduct[23],
                pro_input_description: currentProduct[27],
                seller: currentProduct[32],
                brand: currentProduct[33],
                extra_input_description: currentProduct[35],
                status: 0
              }
              // await this.productModel.create(productInput)
              const variantsList = currentProduct.slice(36,)
              const productVariants:CreateProductVariantInput[] = []
              for(let i = 0;i<variantsList.length;i=i+11){
                console.log(typeof variantsList[i])
              }
              console.log('Variant list : ', variantsList)
            }
            return 'Success'
          } catch (err) {
            return 'Failed';
          }
        })
    }
    catch (err) {
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
