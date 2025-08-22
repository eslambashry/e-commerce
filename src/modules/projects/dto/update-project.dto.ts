// هذا هو الشكل الفعلي لـ UpdateProjectDto الذي يتم إنشاؤه في الخلفية

import { IsString, IsNotEmpty, IsArray, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional() // <-- تمت إضافة هذا الـ Decorator
  @IsString()
  @IsNotEmpty()
  country?: string; // <-- تمت إضافة علامة الاستفهام لجعل الخاصية اختيارية

  @IsOptional() // <-- تمت إضافة هذا الـ Decorator
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  services_needed?: string[]; // <-- تمت إضافة علامة الاستفهام

  @IsOptional() // <-- تمت إضافة هذا الـ Decorator
  @IsNumber()
  @Min(0)
  budget?: number; // <-- تمت إضافة علامة الاستفهام
}
