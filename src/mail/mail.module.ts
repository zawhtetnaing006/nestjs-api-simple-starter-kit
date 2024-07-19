import { Module } from '@nestjs/common';
import { Transporter } from './mail.transporter';
import { MailService } from './mail.service';

@Module({
  providers: [MailService, Transporter],
  exports: [MailService],
})
export class MailModule {}
