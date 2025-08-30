import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne, // <-- مهم للعلاقات
  JoinColumn, // <-- مهم للعلاقات
} from 'typeorm';
import { Vendor } from './vendor.entity';
import { Project } from 'src/modules/projects/entities/project.entity';


@Entity('matches') // 1. يخبر TypeORM أن هذا Class يمثل جدولاً اسمه "matches"
export class Match {
  @PrimaryGeneratedColumn('uuid') // 2. المفتاح الأساسي للجدول
  id: string;

  // --- 3. العلاقة مع جدول المشاريع (Projects) ---
  @ManyToOne(() => Project, { onDelete: 'CASCADE' }) // 4. علاقة "متعدد إلى واحد"
  @JoinColumn({ name: 'project_id' }) // 5. تحديد اسم عمود المفتاح الخارجي
  project: Project; // 6. خاصية للوصول إلى كائن المشروع الكامل

  @Column() // 7. عمود لتخزين الـ ID مباشرة
  project_id: string;

  // --- 8. العلاقة مع جدول الموردين (Vendors) ---
  @ManyToOne(() => Vendor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column()
  vendor_id: string;

  // --- 9. البيانات الوصفية (Metadata) ---
  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    comment: 'Calculated match score',
  })
  score: number;

  @CreateDateColumn()
  created_at: Date;
}
