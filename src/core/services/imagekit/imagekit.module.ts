import { Module } from '@nestjs/common';
import { ImagekitService } from './imagekit.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // يحتاج إلى الوصول لمتغيرات البيئة
  providers: [ImagekitService],
  exports: [ImagekitService], // ✨ مهم جداً: اجعل الخدمة متاحة للموديولات الأخرى})
})
export class ImagekitModule {}
