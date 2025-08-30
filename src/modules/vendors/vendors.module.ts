import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor } from './entities/vendor.entity';

@Module({
      imports: [
      TypeOrmModule.forFeature([Vendor]), // <-- تسجيل الـ Project entity هنا
    ],
  controllers: [VendorsController],
  providers: [VendorsService]
})
export class VendorsModule {}
