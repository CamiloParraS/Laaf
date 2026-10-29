import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../auth.dto';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  lastname: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'timestamptz', name: 'last_login', default: () => 'now()' })
  lastLogin: Date;

  @CreateDateColumn({ type: 'timestamptz', name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updatedAt' })
  updatedAt: Date;

  @Column({ type: 'enum', enum: Role, enumName: 'Role' })
  role: Role;

  @Column({ type: 'uuid', name: 'institutionId' })
  institutionId: string;

  @Column({ type: 'uuid', name: 'areaId' })
  areaId: string;
}
