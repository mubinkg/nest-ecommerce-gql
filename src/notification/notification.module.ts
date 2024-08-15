import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationResolver } from './resolvers/notification.resolver';

@Module({
  providers: [NotificationResolver, NotificationService],
})
export class NotificationModule {}
