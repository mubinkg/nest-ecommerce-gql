import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationInput } from '../dto/create-notification.input';
import { UpdateNotificationInput } from '../dto/update-notification.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/customers/jwt-guards';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) { }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Notification)
  createNotification(
    @Args('createNotificationInput') createNotificationInput: CreateNotificationInput,
    @CurrentUser() user: any
  ) {
    console.log(user)
    return this.notificationService.create(createNotificationInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Notification], { name: 'notifications' })
  findAll(@CurrentUser() user: any) {
    return this.notificationService.findAll(user);
  }

  @Query(() => Notification, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.findOne(id);
  }

  @Mutation(() => Notification)
  updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput) {
    return this.notificationService.update(updateNotificationInput.id, updateNotificationInput);
  }

  @Mutation(() => Notification)
  removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationService.remove(id);
  }
}
