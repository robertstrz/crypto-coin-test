import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CoinsModule } from './coins/coins.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../frontend/build'),
      exclude: ['/api*'],
    }),
    CoinsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
