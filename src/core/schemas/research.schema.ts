import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResearchDocument = Research & Document;

@Schema({ timestamps: true }) // timestamps تضيف createdAt و updatedAt تلقائياً
export class Research {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, ref: 'Project' }) // رابط لمشروع MySQL (معرف فقط)
  projectId: string;

  @Prop({ type: [String] }) // مصفوفة من النصوص
  tags: string[];

  // --- حقول الملف المرفوع من ImageKit ---
  @Prop({ required: true })
  fileUrl: string; // رابط الملف للوصول إليه

  @Prop({ required: true })
  fileId: string; // معرّف الملف في ImageKit (مهم للحذف والتحديث)

  @Prop({ required: true })
  fileType: string; // نوع الملف (e.g., 'image', 'file')
}

export const ResearchSchema = SchemaFactory.createForClass(Research);
