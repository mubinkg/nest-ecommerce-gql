import { Module } from '@nestjs/common';
import { ProductAttributesService } from './service/product-attributes.service';
import { ProductAttributesResolver } from './resolvers/product-attributes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductAttribute, ProductAttributeSchema } from './entities/product-attribute.entity';
import { ProductAttributeSet, ProductAttributeSetSchema } from './entities/product-attribute-set.entity';
import { ProductAttributeSetService } from './service/product-attribute-set.service';
import { ProductAttributeValue, ProductAttributeValueSchema } from './entities/product-attribute-value.entity';

@Module({

  imports:[
    MongooseModule.forFeature([
      {
        schema: ProductAttributeSchema,
        name: ProductAttribute.name
      }
    ]),
    MongooseModule.forFeature([
      {
        schema: ProductAttributeSetSchema,
        name: ProductAttributeSet.name
      }
    ]),
    MongooseModule.forFeature([
      {
        schema: ProductAttributeValueSchema,
        name: ProductAttributeValue.name
      }
    ])
  ],

  providers: [ProductAttributesResolver, ProductAttributesService,ProductAttributeSetService],
})
export class ProductAttributesModule {}
