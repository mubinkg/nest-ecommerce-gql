import { Module } from '@nestjs/common';
import { ProductAttributesService } from './product-attributes.service';
import { ProductAttributesResolver } from './product-attributes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductAttribute, ProductAttributeSchema } from './entities/product-attribute.entity';
import { ProductAttributeSet, ProductAttributeSetSchema } from './entities/product-attribute-set.entity';
import { ProductAttributeSetService } from './product-attribute-set.service';

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
    ])
  ],

  providers: [ProductAttributesResolver, ProductAttributesService,ProductAttributeSetService],
})
export class ProductAttributesModule {}
