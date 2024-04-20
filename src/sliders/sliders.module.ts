import { Module } from '@nestjs/common';
import { SlidersService } from './services/sliders.service';
import { SlidersResolver } from './resolvers/sliders.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Slider, SliderSchema } from './entities/slider.entity';
import { SliderType, SliderTypeSchema } from './entities/slider-type.entity';
import { AdminSliderResolver } from './resolvers/admin.slider.resolver';
import { AdminSliderService } from './services/admin-slider.service';

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
  providers: [SlidersResolver, SlidersService, AdminSliderResolver, AdminSliderService],
})
export class SlidersModule {}
