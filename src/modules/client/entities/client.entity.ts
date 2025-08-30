import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clients') // هذا يخبر TypeORM أن هذا الـ Class يمثل جدولاً اسمه "clients"
export class Client {
  @PrimaryGeneratedColumn('uuid') // المفتاح الأساسي، من نوع UUID
  id: string;

  @Column({ type: 'varchar', length: 150 }) // عمود نصي لاسم الشركة
  company_name: string;

  @Column({ type: 'varchar', unique: true }) // عمود نصي للبريد الإلكتروني، ويجب أن يكون فريداً
  contact_email: string;

  @CreateDateColumn() // عمود يسجل تاريخ إنشاء السجل تلقائياً
  created_at: Date;

  @UpdateDateColumn() // عمود يسجل تاريخ آخر تحديث للسجل تلقائياً
  updated_at: Date;
}