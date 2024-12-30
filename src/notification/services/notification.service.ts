import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from '../dto/create-notification.input';
import { UpdateNotificationInput } from '../dto/update-notification.input';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '../entities/notification.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NotificationService {

  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>
  ) { }

  async create(createNotificationInput: CreateNotificationInput, user:any) {
    try {
      return await this.notificationModel.create({...createNotificationInput, customer: user.userId})
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationInput: UpdateNotificationInput) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
