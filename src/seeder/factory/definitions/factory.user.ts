import { faker } from '@faker-js/faker';
import { Factory } from '../factory';
import { Prisma } from '@prisma/client';

export class User implements Factory {
  public model: string = 'user';
  public count: number = 10;
  public definition(): Prisma.UserCreateInput {
    return {
      email: faker.internet.email(),
      password: '123',
    };
  }
}
