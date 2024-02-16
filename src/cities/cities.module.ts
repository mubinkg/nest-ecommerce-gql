import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesResolver } from './cities.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './entities/city.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: City.name, schema: CitySchema
      }
    ])
  ],
  providers: [CitiesResolver, CitiesService],
})
export class CitiesModule {}
