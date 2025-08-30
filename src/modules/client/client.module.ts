import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
    imports: [
    TypeOrmModule.forFeature([Client]), // <-- تسجيل الـ Project entity هنا
  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
