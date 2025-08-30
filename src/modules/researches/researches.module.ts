import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResearchesController } from './researches.controller';
import { ResearchesService } from './researches.service';
import { ImagekitModule } from 'src/core/services/imagekit/imagekit.module';
import { Research, ResearchSchema } from 'src/core/schemas/research.schema';
// سنقوم بإنشاء هذا الملف في الخطوة التالية

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Research.name, schema: ResearchSchema }]),
    ImagekitModule, 
  ],
  controllers: [ResearchesController],
  providers: [ResearchesService],
})
export class ResearchesModule {}
