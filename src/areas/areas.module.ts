import { Module } from '@nestjs/common';
import { AreasService } from './services/areas.service';
import { AreasResolver } from './resolvers/areas.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Area, AreaSchema } from './entities/area.entity';
import { AdminAreaResolver } from './resolvers/admin-area.resolver';
import { AdminAreaService } from './services/admin-area.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Area.name, schema: AreaSchema}
    ])
  ],
  providers: [AreasResolver, AreasService, AdminAreaResolver, AdminAreaService],
})
export class AreasModule {}
