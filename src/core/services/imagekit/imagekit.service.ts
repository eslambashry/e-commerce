import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';

@Injectable()
export class ImagekitService {
  private imagekit: ImageKit;

  constructor(private configService: ConfigService) {
    this.imagekit = new ImageKit({
      publicKey: this.configService.get<string>('IMAGEKIT_PUBLIC_KEY'),
      privateKey: this.configService.get<string>('IMAGEKIT_PRIVATE_KEY'),
      urlEndpoint: this.configService.get<string>('IMAGEKIT_URL_ENDPOINT'),
    });
  }

  async upload(
    file: Express.Multer.File,
    fileName: string,
    folder: string,
  ): Promise<any> {
    return this.imagekit.upload({
      file: file.buffer, // بيانات الملف
      fileName: fileName, // اسم الملف
      folder: folder, // مجلد لتنظيم الملفات في ImageKit
      useUniqueFileName: true, // يضمن عدم تكرار أسماء الملفات
    });
  }
}
