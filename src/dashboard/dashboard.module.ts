import { Module } from '@nestjs/common';
import { DashboardService } from './services/dashboard.service';
import { DashboardResolver } from './resolvers/dashboard.resolver';

@Module({
  providers: [DashboardResolver, DashboardService],
})
export class DashboardModule {}
