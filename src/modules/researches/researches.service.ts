import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Research, ResearchDocument } from 'src/core/schemas/research.schema';
import { ImagekitService } from 'src/core/services/imagekit/imagekit.service';
import { CreateResearchDto } from './dto/create-research.dto';


@Injectable()
export class ResearchesService {
  constructor(
    @InjectModel(Research.name) private researchModel: Model<ResearchDocument>,
    private readonly imagekitService: ImagekitService,
  ) {}

  async create(
    createResearchDto: CreateResearchDto,
    file: Express.Multer.File,
  ): Promise<Research> {
    // 1. رفع الملف إلى ImageKit
    const uploadResult = await this.imagekitService.upload(
      file,
      file.originalname,
      'researches', // اسم المجلد في ImageKit
    );

    // 2. إنشاء سجل جديد في MongoDB بالبيانات من DTO و ImageKit
    const newResearch = new this.researchModel({
      ...createResearchDto,
      fileUrl: uploadResult.url,
      fileId: uploadResult.fileId,
      fileType: uploadResult.fileType,
    });

    return newResearch.save();
  }

  async search(query: { tag?: string; text?: string; projectId?: string }) {
    const mongoQuery: any = {};

    if (query.projectId) {
      mongoQuery.projectId = query.projectId;
    }
    if (query.tag) {
      mongoQuery.tags = { $in: [query.tag] };
    }
    if (query.text) {
      mongoQuery.title = { $regex: query.text, $options: 'i' }; // بحث غير حساس لحالة الأحرف
    }

    return this.researchModel.find(mongoQuery).exec();
  }
}
