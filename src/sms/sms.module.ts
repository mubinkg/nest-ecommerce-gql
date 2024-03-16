import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsResolver } from './sms.resolver';

@Module({
  providers: [SmsResolver, SmsService],
})
export class SmsModule {}
