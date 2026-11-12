import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../auth.dto';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', name: 'last_name' })
  lastName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'timestamptz', name: 'last_login', default: () => 'now()' })
  lastLogin: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'date_register' })
  dateRegister: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'last_update' })
  lastUpdate: Date;

  @Column({ type: 'enum', enum: Role, enumName: 'Role' })
  role: Role;

  @Column({ type: 'uuid', name: 'institution_id' })
  institutionId: string;

  @Column({ type: 'uuid', name: 'area_id' })
  areaId: string;
}
