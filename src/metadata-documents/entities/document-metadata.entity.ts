import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('document_metadata')
export class DocumentMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'owner_id' })
  @Index()
  ownerId: string;

  @Column('uuid', { name: 'template_id' })
  templateId: string;

  @Column('text', { nullable: true })
  content?: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'date_clone' })
  dateClone: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'last_update' })
  lastUpdate: Date;
}
