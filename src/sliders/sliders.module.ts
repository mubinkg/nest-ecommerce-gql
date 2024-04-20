import { Module } from '@nestjs/common';
import { SlidersService } from './services/sliders.service';
import { SlidersResolver } from './resolvers/sliders.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Slider, SliderSchema } from './entities/slider.entity';
import { SliderType, SliderTypeSchema } from './entities/slider-type.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Slider.name,
        schema: SliderSchema
      }, {
        name: SliderType.name,
        schema: SliderTypeSchema
      }
    ])
  ],
  providers: [SlidersResolver, SlidersService],
})
export class SlidersModule {}
