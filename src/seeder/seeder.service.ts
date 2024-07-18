import { Injectable, Logger } from '@nestjs/common';
import { Factories } from './factory/prisma.factories';
import { PrismaService } from '../prisma/prisma.service';
import { Factory } from './factory/factory';

@Injectable()
export class SeederService {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(SeederService.name);
  private readonly factories = Factories;

  async seed(modelFactory: any) {
    try {
      this.logger.log(`Seeding ${modelFactory.model}s...`);
      const data = Array.from({ length: modelFactory.count }).map(() =>
        modelFactory.definition(),
      );
      await (this.prisma[modelFactory.model] as any).createMany({ data });
      this.logger.log(
        `${modelFactory.count} ${modelFactory.model}s seeded successfully`,
      );
    } catch (error) {
      this.logger.error(
        `Error seeding ${modelFactory.model}s: ${error.message}`,
      );
      throw error;
    }
  }

  async main() {
    for (const factory of this.factories) {
      const model: Factory = new factory();
      try {
        await this.seed(model);
      } catch (error) {
        this.logger.error(`Failed to seed ${model.model}: ${error.message}`);
      }
    }
  }
}
