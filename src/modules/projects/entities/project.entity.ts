import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjectStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ type: 'varchar', length: 100 }) 
  country: string;

  @Column({
    type: 'simple-array',
    comment: 'List of services needed for the project',
  })
  services_needed: string[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  budget: number;

  @Column({
    type: 'enum', 
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
  })
  status: ProjectStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
