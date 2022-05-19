import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { CoinsRepository } from './coins.repository';
import { ExchageRateService } from './rate.service';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService, CoinsRepository, ExchageRateService]
})
export class CoinsModule {}
