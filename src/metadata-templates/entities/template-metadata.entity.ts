import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamptz', name: 'date_creation' })
  dateCreation: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'last_update' })
  lastUpdate: Date;
}
