import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import type { Relation } from 'typeorm';
import { Area } from '../../areas/entities/area.entity';

@Entity('institution')
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;
  @OneToMany(() => Area, (area) => area.institution)
  areas: Relation<Area[]>;

  @OneToMany(() => User, (user) => user.institution)
  users: Relation<User[]>;

}
