import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('DocumentMetadata')
export class DocumentMetadata {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'ownerId' })
  @Index()
  ownerId: string;

  @Column('uuid', { name: 'templateId' })
  templateId: string;

  @Column('text', { nullable: true })
  content?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
