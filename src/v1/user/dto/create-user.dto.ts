import { IsEmail } from 'class-validator';

export class CreateUserDto {
  /**
   * User email
   * @example user@gmail.com
   */
  @IsEmail()
  email: string;
}
