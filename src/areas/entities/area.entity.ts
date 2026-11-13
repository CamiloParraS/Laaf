import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('area')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('uuid', { name: 'institution_id' })
  institutionId: string;

  @Column('uuid', { name: 'leader_id', nullable: true })
  leaderId: string | null;
}
