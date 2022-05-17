import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { CoinsController } from './coins.controller';
import { CoinsRepository } from './coins.repository';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService, CoinsRepository]
})
export class CoinsModule {}
