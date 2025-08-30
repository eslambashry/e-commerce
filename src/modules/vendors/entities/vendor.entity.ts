import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vendors') // اسم الجدول في قاعدة البيانات
export class Vendor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true }) // من الجيد أن يكون اسم المورد فريداً
  name: string;

  @Column({
    type: 'simple-array', // يخزن مصفوفة من النصوص مثل: ["USA", "Egypt", "Germany"]
    comment: 'List of countries the vendor operates in',
  })
  countries_supported: string[];

  @Column({
    type: 'simple-array',
    comment: 'List of services offered by the vendor',
  })
  services_offered: string[];

  @Column({
    type: 'decimal',
    precision: 3, // يسمح بقيم مثل 4.5 أو 5.0
    scale: 1,
    default: 0.0,
  })
  rating: number;

  @Column({
    type: 'int',
    comment: 'Response Service Level Agreement in hours',
  })
  response_sla_hours: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
