import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('template_metadata')
export class TemplateMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text')
  subject: string;

  @Column('boolean', { name: 'status_template', default: false })
  statusTemplate: boolean;

  @Column('uuid', { name: 'creator_id' })
  creatorId: string;

  @ManyToOne(() => User, (user) => user.templates)
  @JoinColumn({ name: 'creator_id' })
  creator: Relation<User>;

  @CreateDateColumn({ type: 'timestamptz', name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'last_update' })
  lastUpdate: Date;
}
