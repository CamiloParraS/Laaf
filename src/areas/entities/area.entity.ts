import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import type { Relation } from 'typeorm';
import { Institution } from '../../institutions/entities/institution.entity';

@Entity('area')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;

  @Column('uuid', { name: 'institution_id' })
  institutionId: string;

  @ManyToOne(() => Institution, (institution) => institution.areas)
  @JoinColumn({ name: 'institution_id' })
  institution: Relation<Institution>;

  @Column('uuid', { name: 'leader_id', nullable: true })
  leaderId: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'leader_id' })
  leader: Relation<User> | null;
  @OneToMany(() => User, (user) => user.area)
  users: Relation<User[]>;

}
