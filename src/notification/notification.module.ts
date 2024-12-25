import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationResolver } from './resolvers/notification.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './entities/notification.entity';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        schema: NotificationSchema,
        name: Notification.name
      }
    ])
  ],
  providers: [NotificationResolver, NotificationService],
})
export class NotificationModule {}
