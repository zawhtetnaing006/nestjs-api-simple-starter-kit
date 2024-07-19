import { IsEmail } from 'class-validator';

export class MailDto {
  @IsEmail()
  from: string;

  @IsEmail()
  to: string;

  subject: string;
  text?: string;
  templatePath?: string;
  templateData?: Record<string, any>;
}
