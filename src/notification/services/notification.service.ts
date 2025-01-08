import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from '../dto/create-notification.input';
const admin = require('firebase-admin');
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from '../entities/notification.entity';
import { InjectModel } from '@nestjs/mongoose';
import { convertToObjectId } from 'src/utils/convert-to-objectid';

@Injectable()
export class NotificationService {

  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<NotificationDocument>
  ) { }

  async create(createNotificationInput: CreateNotificationInput, user: any) {
    try {
      const message = {
        notification: {
          title: createNotificationInput.title,
          body: createNotificationInput.body,
        },
        token: 'fUcTwz-Ee0XYpR8klnUU25:APA91bHpnr8hgOpzJDOdzjH-A6wc9l68JlVHyPzbrmOZ-1WkX7UAKbA-wiz5SqR99FXdiYKuetBViYk2mfauM24EENiuinCwuZFySurz9313lNGJNLnBz54',
      };
      await admin.messaging().send(message);
      return await this.notificationModel.create({ ...createNotificationInput, customer: user.userId })
    } catch (err) {
      throw err;
    }
  }

  async findAll(user: any) {
    try {
      const notifications = await this.notificationModel.find({ customer: convertToObjectId(user.userId) }).populate('customer')
      return notifications
    }
    catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  async update(id: string) {
    try {
      await this.notificationModel.findByIdAndUpdate(id, { isRead: true })
      return await this.notificationModel.findById(id)
    }
    catch (err) {
      throw err;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
