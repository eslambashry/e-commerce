// src/modules/projects/project.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// تعريف enum للحالات الممكنة للمشروع
export enum ProjectStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('projects') // <-- هذا يخبر TypeORM أن هذا الـ Class يمثل جدولاً اسمه "projects"
export class Project {
  @PrimaryGeneratedColumn('uuid') // <-- المفتاح الأساسي، من نوع UUID (معرّف فريد عالمياً)
  id: string;

  // في المستقبل، سنربط هذا بعميل حقيقي باستخدام علاقة @ManyToOne
  // @Column()
  // clientId: string; 

  @Column({ type: 'varchar', length: 100 }) // <-- عمود نصي بطول أقصى 100
  country: string;

  @Column({
    type: 'simple-array', // <-- يخزن مصفوفة من النصوص في عمود واحد
    comment: 'List of services needed for the project',
  })
  services_needed: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // <-- عمود للأرقام العشرية (للميزانية)
  budget: number;

  @Column({
    type: 'enum', // <-- عمود من نوع enum
    enum: ProjectStatus,
    default: ProjectStatus.PENDING, // القيمة الافتراضية
  })
  status: ProjectStatus;

  @CreateDateColumn() // <-- عمود يسجل تاريخ إنشاء السجل تلقائياً
  created_at: Date;

  @UpdateDateColumn() // <-- عمود يسجل تاريخ آخر تحديث للسجل تلقائياً
  updated_at: Date;
}
