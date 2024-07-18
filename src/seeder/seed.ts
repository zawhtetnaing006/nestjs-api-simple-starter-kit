import { NestFactory } from '@nestjs/core';
import { SeederService } from './seeder.service';
import { SeederModule } from './seeder.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(SeederService);
  await seeder.main();
  await app.close();
}

bootstrap().catch((err) => {
  console.error('Failed to seed database:', err);
  process.exit(1);
});
