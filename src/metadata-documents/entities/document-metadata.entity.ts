import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TemplateMetadata } from '../../metadata-templates/entities/template-metadata.entity';
import type { Relation } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('document_metadata')
export class DocumentMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'owner_id' })
  @Index()
  ownerId: string;

  @ManyToOne(() => User, (user) => user.documents)
  @JoinColumn({ name: 'owner_id' })
  owner: Relation<User>;

  @Column('uuid', { name: 'template_id' })
  templateId: string;

  @ManyToOne(() => TemplateMetadata, (template) => template.documents)
  @JoinColumn({ name: 'template_id' })
  template: Relation<TemplateMetadata>;

  @Column('text', { nullable: true })
  content?: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'date_clone' })
  dateClone: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'last_update' })
  lastUpdate: Date;
}
