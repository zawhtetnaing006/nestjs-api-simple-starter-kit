import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ValidationSchema } from 'src/app.config-validationSchema';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
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
  ],
  providers: [SeederService],
})
export class SeederModule {}
