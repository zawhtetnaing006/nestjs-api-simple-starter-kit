import { Injectable } from '@nestjs/common';
import { Transporter } from './mail.transporter';
@Injectable()
export class MailService {
  constructor(private readonly transporter: Transporter) {}
  async sendMail(message: string) {
    const transport = this.transporter.getTransporter();
    await transport.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: 'bar@example.com, baz@example.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: message, // plain text body
      html: `${message}`, // html body
    });
  }
}
