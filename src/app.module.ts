import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './v1/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ValidationSchema } from './app.config-validationSchema';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { FileModule } from './file/file.module';
import { FileLocalService } from './file/service/file.local.service';
import { MyLoggerService } from './my-logger/my-logger.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: (() => {
        switch (process.env.NODE_ENV) {
          case 'development':
            return ['.env.development'];
          case 'staging':
            return ['.env.staging'];
          case 'production':
            return ['.env.production'];
          default:
            return ['.env.development'];
        }
      })(),
      cache: true,
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    PrismaModule,
    FileModule.register('local'),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, FileLocalService, MyLoggerService],
})
export class AppModule {}
