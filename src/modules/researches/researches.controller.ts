import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResearchesService } from './researches.service';
import { CreateResearchDto } from './dto/create-research.dto';

@Controller('researches')
export class ResearchesController {
  constructor(private readonly researchesService: ResearchesService) {}

  // --- نقطة نهاية رفع الملف ---
  @Post('upload')
  @UseInterceptors(FileInterceptor('document')) // 'document' هو اسم الحقل في form-data
  create(
    @Body() createResearchDto: CreateResearchDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
          // يمكنك إضافة FileTypeValidator هنا
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.researchesService.create(createResearchDto, file);
  }

  // --- نقطة نهاية البحث ---
  @Get('search')
  search(
    @Query('tag') tag?: string,
    @Query('text') text?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.researchesService.search({ tag, text, projectId });
  }
}
