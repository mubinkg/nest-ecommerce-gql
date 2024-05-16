import { Module } from '@nestjs/common';
import { CitiesService } from './services/cities.service';
import { CitiesResolver } from './resolvers/cities.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './entities/city.entity';
import { AdminCitiesResolver } from './resolvers/admin-cities.resolver';
import { AdminCitiesService } from './services/admin-cities.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: City.name, schema: CitySchema
      }
    ])
  ],
  providers: [CitiesResolver, CitiesService, AdminCitiesResolver, AdminCitiesService],
})
export class CitiesModule {}
